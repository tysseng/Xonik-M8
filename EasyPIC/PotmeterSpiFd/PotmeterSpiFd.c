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

#include <built_in.h>

enum packageTypes {
  CTRL_8_BIT = 0,
  CTRL_16_BIT
};

unsigned short spiPackageLengths[2];

unsigned short bytecounter = 0;
unsigned short inputlength = 0;
unsigned short inputbuffer[256];

unsigned short outputlength = 0;
unsigned short outputBuffer[] = {
 0,0, // 3 empty bytes
 4,1,1,1, // then a valid message that arrives just in time to be read on write
 0,0,0,0, // 4 empty bytes
 4,2,2,2, 0,0,0,0, 0,0,0,0, 0,0,0,0}; // then a valid message that arrives just too late to be read on write but that should trigger a read

unsigned short dataToSend = 0;
unsigned short dataReady = 0;

void SPI4_interrupt() iv IVT_SPI_4 ilevel 6 ics ICS_SOFT{

  volatile char rxByte;
  rxByte = SPI4BUF;

  //prepare next send
  
  SPI4BUF = outputBuffer[byteCounter];

    if(bytecounter == 2 || bytecounter == 10) {
      PORTB.F1 = 1; // raise interrupt to get master to fetch data
    } else if(bytecounter == 3 || bytecounter == 11){
      PORTB.F1 = 0;
    }

  bytecounter++;
  

  //reset interrupt
  SPI4RXIF_bit = 0;
}

void SPI4_init_interrupts(){

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

void initSlaveInterrupt(){
  TRISB1_bit = 0; //PORTB.B1 as output
  LATB1_bit = 0;
}

void initTypes(){
  // lengths: byte 1 is type, byte 2 is id. The rest is data.
  spiPackageLengths[CTRL_8_BIT] = 3;
  spiPackageLengths[CTRL_16_BIT] = 4;
}

void main() {

  unsigned short i;
  unsigned short j= 1;
  unsigned short adc;
  unsigned short prevSent = 0;
  unsigned short loop = 0;

  initTypes();

  SPI4_init_interrupts();
  EnableInterrupts();

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

  //Set portD as output
  TRISD = 0;
  LATD = 0;

  initSlaveInterrupt();

  //SPI4BUF = outputBuffer[byteCounter];
  SPI4BUF = 0;
  while(1){
  }
}