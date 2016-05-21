/**
 * PIC32MX SPI slave example using interrupt for detecting received data,
 * tested on an EasyPIC Fusion v8 with a PIC32MX795F512L receiving data from an
 * EasyPIC3 with a PIC18F458
 *
 * Compiler versions tested:
 *   - MikroC PRO for PIC v6.5.0
 *   - MikroC PRO for PIC32 v3.5.0
 *
 * Example uses SPI3A as this is the only SPI port on the PIC32MX795F512L that
 * has all the pins on the same output header.
 *
 * SPI pins:
 *   RF13 = SCK (pin 39)
 *   RF4 = SDI (pin 49)
 *   RF5 = SDO (pin 50)
 *
 * Note:
 *  - _SPI_ACTIVE_2_IDLE in MikroC PRO for PIC32 equals _SPI_HIGH_2_LOW in
 *    MikroC PRO for PIC
 *  - in MikroC, SPI3A is named SPI4
    - SPI2A however, is named SPI2
 *  - Data received through SPI is displayed on PORTB
 *  - PIC32 SPI is 5v tolerant so no voltage conversion is needed between a
 *    PIC18F and a PIC32.
 */

#define UNIT_TEST_SPI
#ifdef UNIT_TEST_SPI
  #include "Spi.test.h"
#endif

#include "Dac.h"
#include "Matrix.h"
#include "Tune.h"
#include "Config.h"
#include "Types.h"
#include "Spi.internal.h"
#include "ByteArrayTools.h"
#include <built_in.h>

#define TX_INTERRUPT_TRIS TRISC4_bit
#define TX_INTERRUPT LATC4_bit

unsigned int i = 0;

// Receive buffer state
char rxWritePos = 0;
char rxReadPos = 0;
char bytesInRxBuffer = 0;
char rxbuffer[256];

// State of the package currently being received.
// The expected number of bytes for the current package
char rxlength = 0;
// The number of bytes of a package that has been received
char rxbytecounter = 0;

// Transmit buffer
unsigned short txbytecounter = 0;
unsigned short txlength = 0;
unsigned short txbuffer[256];
unsigned short dataToSend = 0;

// TODO: Just for debugging
unsigned short controller[8];
unsigned short potmeter[8]; // last registered potmeter value

#define SPI_IP0 IPC7.B26
#define SPI_IP1 IPC7.B27
#define SPI_IP2 IPC7.B28
#define SPI_RX_IE SPI2RXIE_bit
#define SPI_RX_IF SPI2RXIF_bit
#define SPI_CON_ENHBUF SPI2CON.ENHBUF
#define SPI_IVT IVT_SPI_2
#define SPI_BUF SPI2BUF
#define SLAVE_SPI_Init_Advanced SPI2_Init_Advanced

void SPI3_interrupt() iv SPI_IVT ilevel 6 ics ICS_SOFT{
  volatile char rxbyte;

  rxbyte = SPI_BUF;

//  LATA = rxbyte;
  
  if(dataToSend){
    // Remove interrupt after first byte has been sent.
    if(txbytecounter == 1){
      TX_INTERRUPT = 0;
    }

    // Prepare next byte if one is present.
    // If not, indicate that sending is complete
    if(txbytecounter < txlength){
      SPI_BUF = txbuffer[txbytecounter];
      //txbuffer[txbytecounter] = 0;
      txbytecounter++;
    } else {
      txbytecounter = 0;
      dataToSend = 0;
    }
  }

  // The next data returned to the master should be empty if no data is queued
  // for send. This also covers the case when the master is writing but not
  // expecting any returned data.
  if(!dataToSend){
    SPI_BUF = 0;
  }
  
  receiveByte(rxbyte);

  //reset interrupt
  SPI_RX_IF = 0;
}

void receiveByte(char rxbyte){
  // Detect the length of the incoming message
  if(rxbytecounter == 0){
    rxlength = rxbyte;
  }

  // Treat received data. If the master is just reading (not writing), all
  // received bytes will be zero and the detected length is thus zero.
  // In this case, no data is written to the receive buffer
  if(rxlength > 0){
    rxbytecounter++;
    bytesInRxBuffer++;

    rxbuffer[rxWritePos++] = rxbyte;

    // TODO: if bytesInRxBuffer == 256 then buffer is full! Signal back to
    // master that last message failed?

    // reset bytecounter if reception is completed (to get the correct rxlength
    // for the next package to receive)
    if(rxbytecounter == rxlength){
      rxbytecounter = 0;
    }
  }
}

void initSlaveSPIInterrupts(){

  // Trigger interrupt when buffer is not empty.
  // Only used in enhanced buffer mode
/*   SPI3CON.SRXISEL1 = 0;
   SPI3CON.SRXISEL0 = 1;*/

   //Turn on if you want to be able to receive multiple bytes before
   //treating them.
   SPI_CON_ENHBUF = 0;

   //Clear data received interrupt flag
   SPI_RX_IF = 0;

   //Set priority as 6
   SPI_IP2 = 1;
   SPI_IP1 = 1;
   SPI_IP0 = 0;

   //Enable interrupt on receive
   SPI_RX_IE = 1;
}



void initSlaveSPI(){
  //NB: SPI4 = SPI3A on the chip as Mikroelektronika and Microchip use
  //    different naming schemes
  SLAVE_SPI_Init_Advanced(
    _SPI_SLAVE,
    _SPI_8_BIT,
    1024, // not used in slave mode
    _SPI_SS_DISABLE,
    _SPI_DATA_SAMPLE_END,
    _SPI_CLK_IDLE_LOW,
    _SPI_ACTIVE_2_IDLE);
    
  initSlaveSPIInterrupts();
}

void initSlaveInterrupt(){
  TX_INTERRUPT_TRIS = 0; //Interrupt pin as output
  TX_INTERRUPT = 0;
}

void updateControllerFromSpi8bit(char* package){
  // Controllers are written directly into the matrix's result array to
  // prevent having to fetch them during matrix calculation.
  MX_nodeResults[package[2]] = package[3] << 8;
}

void updateControllerFromSpi16bit(char* package){
  // Controllers are written directly into the matrix's result array to
  // prevent having to fetch them during matrix calculation.
  MX_nodeResults[package[2]] = package[3] << 8 | package[4];
}

void setInputConfigForCC(char* package){
  MIDI_controllerToInputMap[package[MIDI_INPUT_CC]] = package[MIDI_INPUT_CC_INPUT_NUM];
  if(package[2] < 32){
    MIDI_controllerHiRes[package[MIDI_INPUT_CC]] = package[MIDI_INPUT_CC_HI_RES];
  }
}

void setNoteOn(char* package){
  MX_noteOn(package[NOTE_POS_PITCH], package[NOTE_POS_VELOCITY]);
}

void setGlobalTuning(char* package){
  TUNE_updateGlobalTuning(BAT_getAsInt(package, SPI_POS_GLOBAL_TUNING_HI));
}

void SPI_checkForReceivedData(){

  char pos;
  char package[MAX_PACKAGE_SIZE];
  char packageSize;

  while(bytesInRxBuffer > 0){
    packageSize = rxbuffer[rxReadPos];
    if(bytesInRxBuffer >= packageSize){
      for(pos = 0; pos < packageSize; pos++){
        package[pos] = rxbuffer[rxReadPos++];
      }
      bytesInRxBuffer -= packageSize;

      switch(package[1]){
        case SPI_CMD_NOTE_ON:
          setNoteOn(package);
          break;
        case SPI_CMD_NOTE_OFF:
          MX_noteOff();
          break;
        case SPI_CMD_CTRL_16_BIT:
          updateControllerFromSpi16bit(package);
          break;
        case SPI_CMD_CTRL_8_BIT:
          updateControllerFromSpi8bit(package);
          break;
        case SPI_CMD_MATRIX_COMMAND:
          MX_command(package);
          break;
        case SPI_CMD_NODE:
          MX_updateNode(package);
          break;
        case SPI_CMD_NODE_COUNT:
          MX_setNodeCount(package);
          break;
        case SPI_CMD_CONSTANT:
          MX_updateConstant(package);
          break;
        case SPI_CMD_CONSTANTS_COUNT:
          MX_setConstantsCount(package);
          break;
        case SPI_CMD_CONF_MIDI_CC_INPUT:
          setInputConfigForCC(package);
          break;
        case SPI_CMD_TUNE:
          TUNE_retune();
          break;
        case SPI_CMD_GLOBAL_TUNE:
          setGlobalTuning(package);
          break;
        case SPI_CMD_PT_TEST:
          storePackage(package);
          break;
      }
    } else {
      break; // return control to main while waiting for missing bytes
    }
  }
}

void SPI_SEND_noteOn(char voice, char pitch, char velocity){
  //6, NOTE_ON, pitch, velocity
}

void SPI_SEND_noteOff(char voice){
  //2, NOTE_OFF
}

void SPI_init() {
  initSlaveSPI();
  initSlaveInterrupt();
}

// TODO: For debug only
/*
void updateControllerAndSendThroughSpi(unsigned short id, unsigned short value){
  potmeter[id] = value;
  controller[id] = value;

  // transmit changes if no transmission is in progress
  // TODO: Debounce
  // TODO: Queue sends if transmission is in progress.
  if(txbytecounter == 0 && dataToSend == 0){

    txbuffer[0] = 3;
    txbuffer[1] = id;
    txbuffer[2] = value;

    txlength = txbuffer[0];
    dataToSend = 1; // tell the world that we have data to send.

    SPI4BUF = txbuffer[0];

    // raise interrupt to make master to fetch data
    TX_INTERRUPT = 1;
  }
}
*/