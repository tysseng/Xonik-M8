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

#define TX_INTERRUPT_TRIS TRISB1_bit
#define TX_INTERRUPT LATB1_bit

enum packageTypes {
  CTRL_8_BIT = 0,
  CTRL_16_BIT
};

unsigned short spiPackageLengths[2];

unsigned short rxbytecounter = 0;
unsigned short rxlength = 0;
unsigned short rxbuffer[256];

unsigned short txbytecounter = 0;
unsigned short txlength = 0;
unsigned short txbuffer[256];

unsigned short dataToSend = 0;
unsigned short dataReady = 0;

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
  
  // Detect the length of the incoming message
  if(rxbytecounter == 0){
    rxlength = rxbyte;
  }

  // Treat received data. If the master is just reading (not writing), all
  // received bytes will be zero and the detected length is thus zero.
  // In this case, no data is written to the receive buffer
  if(rxlength > 0){
    rxbuffer[rxbytecounter++] = rxbyte;

    // signal to the main program that a whole package has been received.
    if(rxbytecounter == rxlength){
      dataReady = 1;
      rxbytecounter = 0;
    }
  }

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
  TX_INTERRUPT_TRIS = 0; //Interrupt pin as output
  TX_INTERRUPT = 0;
}

void integrationTest(){

}

void main() {

  unsigned short i;
  unsigned short j= 1;
  unsigned short adc;
  unsigned short prevSent = 0;

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

    adc = ADC1_Get_Sample(0) >> 2;   // Get ADC value from corresponding channel

    // transmit changes if no transmission is in progress
    if(txbytecounter == 0 && dataToSend == 0 && adc != prevSent){

      txbuffer[0] = 3;
      txbuffer[1] = 1;
      txbuffer[2] = adc;
      prevSent = adc;

      txlength = txbuffer[0];
      dataToSend = 1; // tell the world that we have data to send.
      
      SPI4BUF = txbuffer[0];
      SPI4BUF = 4;

      // raise interrupt to make master to fetch data
      TX_INTERRUPT = 1;
    }

    Delay_ms(20);
  }
}