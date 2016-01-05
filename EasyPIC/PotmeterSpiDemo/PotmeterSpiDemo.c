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
unsigned short outputBuffer[256];

unsigned short dataToSend = 0;
unsigned short dataReady = 0;

void SPI4_interrupt() iv IVT_SPI_4 ilevel 6 ics ICS_SOFT{

  volatile char rxByte;

  rxByte = SPI4BUF;

  if(dataToSend){
    if(bytecounter < outputlength){
      SPI4BUF = outputBuffer[bytecounter];
      bytecounter++;
    } else {
      dataToSend = 0;
      PORTB.F1 = 0; // remove interrupt to indicate that all data has been transmitted.
      bytecounter = 0;
    }
  } else {
    // detect what type of package we're receiving
    if(bytecounter == 0){
      inputlength = spiPackageLengths[rxByte];
    }
    inputbuffer[bytecounter++] = rxByte;

    // signal to the main program that a whole package has been received.
    if(bytecounter == inputlength){
      dataReady = 1;
      bytecounter = 0;
    }
  }

  //reset interrupt
  SPI4RXIF_bit = 0;
}

void SPI4_init_interrupts(){

  //Trigger interrupt when buffer is not empty
   SPI4CON.SRXISEL1 = 0;
   SPI4CON.SRXISEL0 = 1;

   //Turn on if you want to be able to receive multiple bytes before
   //treating them.
   //SPI4CON.ENHBUF = 1;

   //Clear data received interrupt flag
   SPI4RXIF_bit = 0;

   //Set priority as 6
   IPC8.B4 = 1;  //SPI3AIP2
   IPC8.B3 = 1;  //SPI3AIP1
   IPC8.B2 = 0;  //SPI3AIP0

   //Enable interrupt on receive
   SPI4RXIE_bit = 1;
}

void initTypes(){
  // lengths: byte 1 is type, byte 2 is id. The rest is data.
  spiPackageLengths[CTRL_8_BIT] = 3;
  spiPackageLengths[CTRL_16_BIT] = 4;
}


void initADC() {
  AD1PCFG = 0xFFFE;              // Configure AN pins as digital I/O, PORTB.B0 as analog
  JTAGEN_bit = 0;                // Disable JTAG port
  TRISB0_bit = 1;                // Set PORTB.B0 as input
  ADC1_Init();                   // Initialize ADC module
  Delay_ms(100);
}

void initSlaveInterrupt(){
  TRISB1_bit = 0; //PORTB.B1 as output
  LATB1_bit = 0;
}

void main() {

  unsigned short i;
  unsigned short j= 1;
  unsigned short adc;

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
  initADC();

  delay_ms(1000);



  while(1){
    if(dataReady){
      //PORTB = inputbuffer[2];
      dataReady = 0;
    }

    // indicate that data is ready
//    if(byteCounter == 0 && dataToSend == 0){
      adc = ADC1_Get_Sample(0) >> 2;   // Get ADC value from corresponding channel

      outputBuffer[0] = CTRL_8_BIT;
      outputBuffer[1] = 1;
      outputBuffer[2] = adc;

      outputlength = spiPackageLengths[outputBuffer[0]];
      dataToSend = 1;
      SPI4BUF = outputBuffer[0];
      bytecounter++;
      PORTB.F1 = 1; // raise interrupt to get master to fetch data
//    }

    Delay_ms(10);
  }
}