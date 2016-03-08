#define FAKE_DAC

// BUG: If timer1 is started, but no interrupt routine exists to catch the interrupt,
// no other interrupts (?), at least not SPI interrupt, will work. The symptom is that
// the raspberry pi spi receives bogus data back when it tries to send data itself!

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
#include "Dac.h"
#include "Dac.internal.h"
#include "Matrix.h"
#include "Output.h"

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


// The number of dac updates finished since last time the matrix were run.
// This is checked before a new runMatrix is called as timing is done through
// a timer interrupt that increments what dac to update.
// NB: As dacs may have been updated multiple times since the matrix run started,
// any ramp increments should be multiplied by this number to get correct timing.
// This is done by using intervalMultiplier, which is a copy of dacUpdatesFinished
// that stays constant through a whole run of the matrix.
unsigned short DAC_dacUpdatesFinished;
unsigned short DAC_intervalMultiplier;  //TODO: set og reset denne

// the current output, loops from timer interrupt.
char output = 0;

#ifndef RUNTESTS
void Timer1Interrupt() iv IVT_TIMER_1 ilevel 7 ics ICS_SRS {

  // Timer automatically resets to 0 when it matches PR1, no
  // need to reset timer.
  T1IF_bit = 0;

  // First output of a cycle. Store whatever is in the output buffer to
  // prepare calculation of the next dac cycle while the dac works its way
  // on the current cycle.
  if(output == 0){

    // Don't swap buffers if the current buffer has not been fully calculated
    // yet.
    if(MX_matrixCalculationCompleted){
      OUT_swapBuffers();
      
      // store the number of updates the dac did during the previous matrix
      // calculation. This will be used as a multiplier for ramp/timers in the
      // next cycle to correct any skewing due to matrix calculation taking more 
      // than 1 DAC update (as DAC update frequency is our timer)
      DAC_intervalMultiplier = DAC_dacUpdatesFinished;
      MX_matrixCalculationCompleted = 0;
    }

    // TODO: This comment is somewhat fishy
    // signal that data has been copied and that next matrix calculation
    // may start.
    DAC_dacUpdatesFinished++;
  }

  writeValuesToSH(output);

  output = (output + 1) % SR_OUTPUTS;
}
#endif

#ifdef FAKE_DAC
// for testing purposes only
void DAC_step(){
  OUT_swapBuffers();
  MX_matrixCalculationCompleted = 0;
  writeValuesToSH(2);
  DAC_dacUpdatesFinished++;
}
#endif


void DAC_fillOutputs(unsigned int value){
  char i;
  for(i = 0; i<OUTPUTS; i++){
    OUT_dacBuffer[i] = value;
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

  loadDac(OUT_dacBuffer[sr_output] + 0x8000);

  // select and load DAC B
  A0 = 1;
  A1 = 1;
  
  loadDac(OUT_dacBuffer[SR_OUTPUTS + sr_output] + 0x8000);

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

void initDacPorts(){
  // disable JTAG to get control of all pins on PORTA/L
  JTAGEN_bit = 0;

  //Set ports as output
  TRISB = TRISB & 0xFF00;
  LATB = 0;

  TRISD = 0;
  LATD = 0;

  TRISA = 0;
  LATA = 0;
}

void DAC_startTimer(){
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

void DAC_init(){

  initDacPorts();
  
  //necessary to start runMatrix.
  DAC_dacUpdatesFinished = 0;
    
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

  DAC_fillOutputs(0xFFFF);
}