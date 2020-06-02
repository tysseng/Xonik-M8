#include <built_in.h>
#include "PinConfig.h"
#include "Config.h"
#include "DebugLed.h"

// Commands, shared with DCO
#define RUN_FREQUENCY_UPDATE 0b00000001
#define RUN_AMPLITUDE_CALIBRATE 0b00000010


// TODO: Change this later, but for now it is practical to use the same connector for SPI and data ready
//#define DCO_DATA_READY TUNE_A0
//#define DCO_DATA_READY_TRIS TUNE_A0_TRIS
#define DCO_DATA_READY LATA7_bit
#define DCO_DATA_READY_TRIS TRISA7_bit

#define DCO_SPI_Init_Advanced SPI4_Init_Advanced
#define DCO_SPI_Write SPI4_Write
#define DCO_SPI_IVT IVT_SPI_4
#define DCO_SPI_TXBUF SPI4BUF
#define DCO_SPI_TXBUF_EMPTY_IF SOMETHINGHERE
#define DCO_SPI_TXBUF_EMPTY_IE SOMETHINGHERE
#define DCO_BYTE_TIMER_IVT SOMETHINGELSE
#define DCO_BYTE_TIMER_IF SOMETHINGELSE

// to be able to write to multiple DCOs in one go, we have to write the first and second bytes
// separately
unsigned short currentByte = 1; // must be 1 initially to allow first write.
unsigned short dcoByte1[CONNECTED_DCOS];
unsigned short dcoByte2[CONNECTED_DCOS];

/*
void DCO_NEXT_BYTE_interrupt() iv DCO_BYTE_TIMER_IVT ilevel 6 ics ICS_SOFT{
  if(DCO_BYTE_TIMER_IF){
    DCO_BYTE_TIMER_IF = 0;
    currentByte = 1:
    writeBytesToDco(dcoByte2);
  }
}

void DCO_TX_COMPLETE_interrupt() iv DCO_SPI_IVT ilevel 6 ics ICS_SOFT{
  if(DCO_SPI_TXBUF_EMPTY_IF){
    // flash data ready to make DCOs persist value
    DCO_DATA_READY = 1;
    DCO_DATA_READY = 0;
    DCO_SPI_TXBUF_EMPTY_IF = 0;

    // TODO: Start next byte timer.
    currentByte = 1;
  }
} */

void writeBytesToDco(unsigned short bytesToTransfer[]) {
  unsigned short i;
  for(i=0; i<CONNECTED_DCOS; i++){
    // todo: write to SPI buffer here
  }
}

// Write to multiple DCOs at once. Write is done in two chunks (all high bytes then all low bytes)
// for maximum transfer speed (we are using SPI chaining so multiple DCO SPI buffers act as one
// large shift register). Chunked writing happens using timers and interrupts, so we only need to
// call write once.
void DCO_writeValues(unsigned int dcoValues[]){
  // prevent writing if previous byte has not yet been sent (not sure if really necessary, are there
  // any cases where this may happen?
  if(currentByte == 1){
    currentByte = 0;
    writeBytesToDco(dcoByte1);
  }
}

void DCO_writeValue(unsigned int dcoValue){
  LED_flash1(1);

  // TODO: Change to async writing - write bytes to buffer, set
  // data ready in write complete interrupt, start writing second byte etc.
  DCO_SPI_Write(Hi(dcoValue));
  DCO_SPI_Write(Lo(dcoValue));
  DCO_SPI_Write(RUN_FREQUENCY_UPDATE);

  DCO_DATA_READY = 1;
  
  // This is needed for the DCO to register the change! 1us was not enough
  delay_us(10);
  DCO_DATA_READY = 0;
}

void DCO_calibrate(){
  DCO_SPI_Write(RUN_AMPLITUDE_CALIBRATE);
  DCO_SPI_Write(0);
  DCO_SPI_Write(0);
  DCO_DATA_READY = 1;
  delay_us(10);
  DCO_DATA_READY = 0;
}

void initDcoSPI(){

  DCO_SPI_Init_Advanced(
    _SPI_MASTER,
    _SPI_8_BIT,
    128, // Clock divider, sets speed.
    _SPI_SS_DISABLE,
    _SPI_DATA_SAMPLE_END,
    _SPI_CLK_IDLE_LOW,
    _SPI_ACTIVE_2_IDLE);

  DCO_DATA_READY_TRIS = 0;
  DCO_DATA_READY = 0;

//  initSlaveSPIInterrupts();
}

void DCO_init() {
  initDcoSPI();
}