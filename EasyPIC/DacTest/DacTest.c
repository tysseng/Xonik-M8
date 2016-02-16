// Hardware improvements:
// ----------------------
// A0 and A1 may be connected as long as we only want to set one at the time
// D0-15 should be part of a single 16bit port.
// SH_EN0 and SH_EN1 may be connected as long as we want to populate both simultaneously
// _RS may be connected to 1 as we can reset the DACs manually - just make sure
// to turn down master volume on startup.
// Look at numbering etc (DACA/B to make a more logical output order) - probably
// solved by fixing S&H IO_AN connector.

// Project settings:
// -----------------
// PLL Input Divider: 2x
// PLL Multiplier: 20x
// Oscillator Selection Bits: Primary Osc w/PLL
// Primary Oscillator Configuration: XT osc mode

// Test board setup:
// ------------------
// D0-D7: PORTA/L
// D8-D15: PORTB/L
// DAC control: PORTD/L
// SH control: PORTD/H with the following mapping:
// EasyPIC: DAC-board
//  0: N/C
//  1: 0 and 1 (SH_EN0 and SH_EN1)
//  2: 2 - SH_A0
//  3: N/C
//  4: 3 - SH_A1
//  5: 4 - SH_A2
//  6: 5 - SH_A3
//  7: N/C
//  VCC: VCC
//  GND: GND, AGND (on psu)

#include "built_in.h"
#include "DacTest.h"
#define TX_INTERRUPT_TRIS TRISB1_bit

// PCB:

#define A0 LATD2_bit
#define A1 LATD3_bit
#define _WR LATD4_bit
#define LDAC LATD5_bit

// In a real hw implementation _RS should always be 1 as we can reset the
// dac manually before accepting user input.
#define _RS LATD0_bit

// NB: address bus is shared shared between the two multiplexers, so unless
// both dac outputs are set correctly for the same output of the two mux'es,
// one mux must be turned off before the second is turned on. As the 
// sample and hold circuit has some setling time, it will probably be best
// to set them at the same time.
#define SH_EN0 LATD8_bit
#define SH_EN1 LATD9_bit
#define SH_A0 LATD10_bit
#define SH_A1 LATD12_bit
#define SH_A2 LATD13_bit
#define SH_A3 LATD14_bit

#define DATA_LO LATA // porta/l - D0-D7
#define DATA_HI LATB // portb/l - D8-D15

// HW: 
//  _RS connected to V+
//  MSB connected to GND
//  AD5547 running off 3V3. Opamps running off +/-15V.
//  PSU GND connected to EasyPIC GND, AGND and DGND connected
//  Tested with TL072
//  Circuit connected as 4 quadrant (page 16 of reference manual/dual-dac-w-32-ch-sh-DAC-BOARD in eagle)

unsigned int i = 0;
unsigned int j = 0;

// there are two DACs in use, each one has 16 SH circuits connected to it by
// means of a 1-to-16 mux
const unsigned int SR_OUTPUTS = 16; // shift register outputs
const unsigned int OUTPUTS = SR_OUTPUTS * 2;

// the current output, loops from timer interrupt.
char output = 0;

// values to be output, set by main loop
unsigned int outputVals[OUTPUTS];

void Timer1Interrupt() iv IVT_TIMER_1 ilevel 7 ics ICS_SRS {

  // Timer automatically resets to 0 when it matches PR1, no
  // need to reset timer.
  T1IF_bit = 0;

  if(output == 0){
    if(outputVals[0] != 0){
      fillOutputs(0);
    } else {
      fillOutputs(0xFFFF);
    }
  }

  writeValuesToSH(output);

  output = (output + 1) % SR_OUTPUTS;
}

void fillOutputs(unsigned int value){
  for(i = 0; i<OUTPUTS; i++){
    outputVals[i] = value;
  }
}

void loadDac(unsigned int value){

  // Set output value
  // TODO: Improve efficiency here in real program by using all of a 16bit
  // port
  DATA_LO = Lo(value);
  DATA_HI = Hi(value);

   // load DAC input register
  _WR=0;
  LDAC=0;

  // load DAC register
  _WR=1;
  LDAC=1;

  // reset state
  LDAC=0;
}

void writeValuesToSH(char sr_output){
  // put s&h into hold mode
  SH_EN0 = 0;
  SH_EN1 = 0;

  // select and load DAC A
  A0 = 0;
  A1 = 0;
  loadDac(outputVals[sr_output]);

  // select and load DAC B
  A0 = 1;
  A1 = 1;
  loadDac(outputVals[SR_OUTPUTS + sr_output]);

  // set SH address
  // TODO: Improve efficiency here in real program by using consecutive bits
  // of a single 8 bit port.
  SH_A0 = sr_output.b0;
  SH_A1 = sr_output.b1;
  SH_A2 = sr_output.b2;
  SH_A3 = sr_output.b3;

  // let values settle
  delay_cyc(20);

  // put s&h into sample mode, exposing the addressed s&h for the DAC output.
  SH_EN0 = 1;
  SH_EN1 = 1;

  // now go away and let the S&H sample untill the next SH should be loaded
}

void initDac(){
  unsigned short i;
  // select DAC A
  A0 = 0;
  A1 = 0;

  // set
  _WR = 1;
  LDAC = 0;
  _RS = 1;

  // select DAC B
  A0 = 1;
  A1 = 1;

  // set
  _WR = 1;
  LDAC = 0;
  _RS = 1;

  fillOutputs(0);
}

void initPorts(){
  // disable JTAG to get control of all pins on PORTA/L
  JTAGEN_bit = 0;

  //Set ports as output
  TRISB = 0;
  LATB = 0;

  TRISD = 0;
  LATD = 0;

  TRISA = 0;
  LATA = 0;

  TRISG  = 0;
}

void initTimer1(){
  //Prescaler 1:1; PR1 Preload = 2; Actual Interrupt Time = 25 ns

  // enable and clear interrupt
  T1IE_bit         = 1;
  T1IF_bit         = 0;
  
  // set interrupt priority
  T1IP0_bit         = 1;
  T1IP1_bit         = 1;
  T1IP2_bit         = 1;
  
  // set period = 25uS
  PR1                 = 2000;
  
  // clear timer
  TMR1 = 0;
  
  // start timer
  T1CON         = 0x8000;
}

void main() {
  initPorts();
  initDac();
  initTimer1();
  EnableInterrupts();

  while(1){
  // do nothing

  }
}