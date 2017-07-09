#include "MidiCore.internal.h"
#include "MidiCore.h"
#include "MidiControllerNumbers.h"
#include "MidiStatusMessages.h"
#include "DebugLed.h"

//TODO: Treat time code messages in interrupt?

//RX ring buffer length. Must not exceed 256 bytes...
#define RX_LEN 6

//midi bitmasks
#define MIDI_BITMASK_STATUS 0xF0
#define MIDI_BITMASK_CHANNEL 0x0F

// counts midi bytes after a CC init has been received
char midiByteCounter;
//ring buffer for receiving midi data
char midiRxBuffer[RX_LEN];
//The last position in the rxBuffer that was read from
char midiRxReadPtr;
//The last position in the rxBuffer thas was written to
char midiRxWritePtr;

// last received midi status and first parameter (e.g. key for note on/off)
char lastMidiStatus = 0;
char lastMidiChannel = 0;
char lastMidiParam1 = 0;

char statusMessageLength[255];

/**** SYSEX input ****/

// status of current sysex reception, what was the last operation and parameters
// received.
char currentSysexOperation = 0;
char currentSysexConfigPos = 0;

// are we currently receiving sysex data?
bit inSysexMode;

// is current sysex stream intended for this device?
bit sysexForThisDevice;

//index of sysex byte after sysex status
char sysexByteCounter = 0;

// cyclic counter counting bytes after sysex address, reset to 0 when one sysex
// operation has been completed (operation length in bytes may depend)
unsigned int sysexDataCounter = 0;
char sysexAddress[] = {0, 43, 92}; //randomly chosen but must start with 0

char activeMidiChannels[16];

void MidiRxInterrupt() iv IVT_UART_1 ilevel 5 ics ICS_AUTO {
  char midiByte;
  char midiStatus;

  if (U1RXIF_bit){
    midiByte = U1RXREG;

    //TODO: May have to use a while loop, checking UR1DA_bit for data as
    // U1RXREG is an 8 byte FIFO queue

    if(midiByte > 0xF7){
      MIDI_HOOK_treatRealtimeStatus(midiByte);
    } else {
      writeToRxBuffer(midiByte);
    }
    U1RXIF_bit = 0;
  }
}

// ******* [start midi input ring buffer] *******

// Write a byte to the next position in the rx buffer.
// A "hole" in the buffer of 1 byte is necessary to detect when we have filled
// the buffer (to prevent overwrites)
//
// NB: If the buffer is full the byte will be dropped! This may happen in
// extreme cases such as the Moog Little Phatty's filter CC, which sends
// 4 midi bytes for each step (two cc's and two data bytes), meaning that
// a single turn of the dial generates 512 messages. With running status
// messages, it is impossible to detect this, so dropping a byte means that
// the control only returns to normal if a new CC (Bx) is received.
//
// - Need to rewrite this to reject the second message if the first is rejected
// (or the next two if it is a status message that is rejected).
void writeToRxBuffer(char input){
  char nextRxPtr;
  nextRxPtr = (midiRxWritePtr + 1) % RX_LEN;

  //check if the read pointer is ahead of the write pointer
  if(nextRxPtr != midiRxReadPtr){
    midiRxWritePtr = nextRxPtr;
    midiRxBuffer[midiRxWritePtr] = input;
  }
}

void writeToRxBuffer_Test(char input){
  char nextRxPtr;
  nextRxPtr = (midiRxWritePtr + 1) % RX_LEN;

  //check if the read pointer is ahead of the write pointer
  if(nextRxPtr != midiRxReadPtr){
    midiRxWritePtr = nextRxPtr;
    midiRxBuffer[midiRxWritePtr] = input;
  }
}

// Gets a midi byte from the input buffer and sends it to the treatMidiByte
// method. Increments read pointer if byte has been treated properly.
void MIDI_CORE_readFromRxBuffer(){
  char nextRxPtr;
  char midiByte;

  while(midiRxReadPtr != midiRxWritePtr){
    // Indicate that midi byte is available
    LED_flash1(1);

    nextRxPtr = (midiRxReadPtr + 1) % RX_LEN;
    midiByte = midiRxBuffer[nextRxPtr];
    treatMidiByte(midiByte);

    //update read pointer once we are sure the byte has been treated
    midiRxReadPtr = nextRxPtr;
  }
}
// ******* [end midi input ring buffer] *******


// ******** [start midi data handling and conversion] ********
void treatMidiByte(char midiByte){
  if(midiByte.F7 == 1){
    treatStatusByte(midiByte);
  } else {
    treatDataByte(midiByte);
  }
}

void treatStatusByte(char midiByte){
  unsigned short listensToChannel;

  // Only single byte status message not treated elsewhere. Realtime messages
  // are treated in interrupt routine and sysex stop in the treatSysexStatusByte.
  if(midiByte == 0xF6){
    MIDI_HOOK_treatTuneRequest();
  }

  // remove status bits from midiByte to get midi channel.
  lastMidiChannel = (midiByte & MIDI_BITMASK_CHANNEL);

  // remove channel bits from midiByte to get midi status code.
  lastMidiStatus = (midiByte & MIDI_BITMASK_STATUS);

  // TODO: Change this to routing to correct voice card group instead.
  // Check if running status is halted on interleaving channel messages.
  listensToChannel = activeMidiChannels[lastMidiChannel];

  //TODO: Must set listening status to true/false and check this in data byte code

  treatSysexStatusByte(midiByte);

  midiByteCounter = 1;
}

void treatSysexStatusByte(char midiByte){
  // Treat sysex status messages.
  if(midiByte == SM_SYSEX_START){

    // tell the world that we received a start message
    LED_flash1(3);

    sysexByteCounter = 0;
    sysexDataCounter = 0;
    inSysexMode = 1;
    sysexForThisDevice = 1; //will be set to false if address check fails later.
  } else if(midiByte == SM_SYSEX_END){

    // tell the world that we received an end message
    LED_flash1(2);
    
    inSysexMode = 0;
    MIDI_HOOK_sysexAborted();
  } else {
    //sysex aborted if we were in sysex mode and received a non-sysex status
    inSysexMode = 0;
    MIDI_HOOK_sysexAborted();
  }
}

void treatDataByte(char midiByte){

  if(inSysexMode){
    treatSysexDataByte(midiByte);
  }

  // Must recheck as sysex mode may have been aborted in the previous call
  if(!inSysexMode){

    // Store last received first-parameter. Switch to 1 after second param to
    // allow for running status
    if(midiByteCounter == 1){ // first parameter received
      if(statusMessageLength[lastMidiStatus] == 2){
        MIDI_HOOK_treatTwoByteMessage(lastMidiChannel, lastMidiStatus, midiByte);
      } else {
        lastMidiParam1 = midiByte;
      }

      // Do something if necessary
      midiByteCounter = 2;
    } else if(midiByteCounter == 2){ // second parameter received
      MIDI_HOOK_treatThreeByteMessage(lastMidiChannel, lastMidiStatus, lastMidiParam1, midiByte);
      // Do something
      midiByteCounter = 1;
    }
  }
}

void treatSysexDataByte(char midiByte){
  if(sysexByteCounter < 3){
    // check if sysex is meant for this device
    if(midiByte != sysexAddress[sysexByteCounter]){
      sysexForThisDevice = 0;
    }
    sysexByteCounter++;
  } else {
    if(sysexForThisDevice){
      MIDI_HOOK_treatSysexByte(midiByte, sysexDataCounter);
      sysexDataCounter++;
    }
  }
}

void initStatusMessageLengths(){
  statusMessageLength[SM_NOTE_OFF] = 3;
  statusMessageLength[SM_NOTE_ON] = 3;
  statusMessageLength[SM_POLY_KEY_PRESSURE] = 3;
  statusMessageLength[SM_CC] = 3;
  statusMessageLength[SM_PROGRAM_CHANGE] = 2;
  statusMessageLength[SM_CHANNEL_PRESSURE] = 2;
  statusMessageLength[SM_PITCH_BEND] = 3;

  // System common messages
  statusMessageLength[SM_SYSEX_START] = 4; //address length, then any number of bytes untill sysex end
  statusMessageLength[SM_MIDI_TIME_CODE_QF] = 2;
  statusMessageLength[SM_SONG_POSITION] = 3;
  statusMessageLength[SM_SONG_SELECT] = 2;
  statusMessageLength[SM_TUNE_REQUEST] = 1;
  statusMessageLength[SM_SYSEX_END] = 1;

  // System realtime messages
  statusMessageLength[SM_TIMING_CLOCK] = 1;
  statusMessageLength[SM_START] = 1;
  statusMessageLength[SM_CONTINUE] = 1;
  statusMessageLength[SM_STOP] = 1;
  statusMessageLength[SM_ACTIVE_SENSING] = 1;
  statusMessageLength[SM_RESET] = 1;
}

void setupRxBuffer(){
  midiRxReadPtr = 0;
  midiRxWritePtr = 0;
}

void setupInterrupts(){
  URXISEL0_bit = 0; //interrupt on first received byte
  URXISEL1_bit = 0;

  // interrupt priority 5
  U1IP0_bit = 1;
  U1IP1_bit = 0;
  U1IP2_bit = 1;

  // interrupt sub priority 3
  U1IS0_bit = 1;
  U1IS1_bit = 1;

  U1RXIE_bit = 1;            // enable USART RX interrupt
}

void setupUsart(){
  UART1_Init(31250);        // initialize USART module
  Delay_ms(100);            // Wait for UART module to stabilize
}

// set channels to listen to
void setupActiveMidiChannels(){
  char i;

  for(i=0; i<16; i++){
    activeMidiChannels[i] = 0;
  }
}

void MIDI_CORE_init(){
  midiByteCounter = 0;
  inSysexMode = 0;
  sysexForThisDevice = 0;

  setupRxBuffer();
  setupUsart();
  setupInterrupts();
  setupActiveMidiChannels();
}