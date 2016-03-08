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
 *  - Data received through SPI is displayed on PORTB
 *  - PIC32 SPI is 5v tolerant so no voltage conversion is needed between a
 *    PIC18F and a PIC32.
 */

//#define UNIT_TEST_SPI
#ifdef UNIT_TEST_SPI
  #include "Spi.test.h"
#endif

#include "Dac.h"
#include "Matrix.h"
#include "Config.h"
#include "Spi.internal.h"
#include <built_in.h>

#define TX_INTERRUPT_TRIS TRISG1_bit
#define TX_INTERRUPT LATG1_bit

unsigned int i = 0;
unsigned short spiPackageLengths[2];

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

void SPI4_interrupt() iv IVT_SPI_4 ilevel 6 ics ICS_SOFT{

  volatile char rxbyte;

  rxbyte = SPI4BUF;
  
  if(dataToSend){
    // Remove interrupt after first byte has been sent.
    if(txbytecounter == 1){
      TX_INTERRUPT = 0;
    }

    // Prepare next byte if one is present.
    // If not, indicate that sending is complete
    if(txbytecounter < txlength){
      SPI4BUF = txbuffer[txbytecounter];
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
    SPI4BUF = 0;
  }
  
  receiveByte(rxbyte);
  
  //reset interrupt
  SPI4RXIF_bit = 0;
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

void initSPI4Interrupts(){

  // Trigger interrupt when buffer is not empty.
  // Only used in enhanced buffer mode
/*   SPI4CON.SRXISEL1 = 0;
   SPI4CON.SRXISEL0 = 1;*/

   //Turn on if you want to be able to receive multiple bytes before
   //treating them.
   SPI4CON.ENHBUF = 0;

   //Clear data received interrupt flag
   SPI4RXIF_bit = 0;

   //Set priority as 6
   IPC8.B4 = 1;  //SPI3AIP2
   IPC8.B3 = 1;  //SPI3AIP1
   IPC8.B2 = 0;  //SPI3AIP0

   //Enable interrupt on receive
   SPI4RXIE_bit = 1;
}

void initSPI4(){
  //NB: SPI4 = SPI3A on the chip as Mikroelektronika and Microchip use
  //    different naming schemes
  SPI4_Init_Advanced(
    _SPI_SLAVE,
    _SPI_8_BIT,
    1024, // not used in slave mode
    _SPI_SS_DISABLE,
    _SPI_DATA_SAMPLE_END,
    _SPI_CLK_IDLE_LOW,
    _SPI_ACTIVE_2_IDLE);
    
  initSPI4Interrupts();
}

void initPackageTypes(){
  // lengths: byte 1 is type, byte 2 is id. The rest is data.
  spiPackageLengths[CTRL_8_BIT] = 3;
  spiPackageLengths[CTRL_16_BIT] = 4;
}

void initSlaveInterrupt(){
  TX_INTERRUPT_TRIS = 0; //Interrupt pin as output
  TX_INTERRUPT = 0;
}


#define barport LATb

void showAsBarOnPortD(unsigned short value){
  trisb = 0;
  if(value < 16){
    barport = 0;
  } else if (value < 48){
    barport = 0b00000001;
  } else if (value < 80){
    barport = 0b00000011;
  } else if (value < 112){
    barport = 0b00000111;
  } else if (value < 144){
    barport = 0b00001111;
  } else if (value < 176){
    barport = 0b00011111;
  } else if (value < 208){
    barport = 0b00111111;
  } else if (value < 240){
    barport = 0b01111111;
  } else {
    barport = 0b11111111;
  }
}

// TODO: Convert to signed
// TODO: Create 16 bit version
void updateControllerFromSpi(unsigned short id, unsigned short value){

  unsigned int val;
  if(value > 255) value = 255;

  val = value;
  val = val * 256;

  //TODO: Check if 8 or 16 bit value!
  if(id < INPUTS){
    MX_inputBuffer[id] = val;
//    DAC_fillOutputs(val);
//    outputVals[id] = value << 8;
  }
}

// TODO: For debug only
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

void SPI_checkForReceivedData(){

  char pos;
  char package[20];
  char packageSize;

  while(bytesInRxBuffer > 0){
    packageSize = rxbuffer[rxReadPos];
    if(bytesInRxBuffer >= packageSize){
      for(pos = 0; pos < packageSize; pos++){
        package[pos] = rxbuffer[rxReadPos++];
      }
      bytesInRxBuffer -= packageSize;

      switch(package[1]){
        case CTRL_8_BIT:
          updateControllerFromSpi(package[1], package[2]);
          break;
        #ifdef UNIT_TEST_SPI
        case PT_TEST:
          storePackage(package);
          break;
        #endif
      }
    } else {
      break; // return control to main while waiting for missing bytes
    }
  }
}

void SPI_init() {
  initPackageTypes();
  initSPI4();
  initSlaveInterrupt();
}