//#define FAKE_DAC

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
#include "PinConfig.h"

//#define DATA_LO LATA // porta/l - D0-D7
//#define DATA_HI LATB // portb/l - D8-D15


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

// TODO: Move this away from DAC file
unsigned int currentDcoValue = 0;
unsigned int nextDcoValue = 0;
unsigned int temp  = 0;

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

    // TODO: Temporary code to write to DCO
    if(temp == 2500){
      temp = 0;
      currentDcoValue += 512;
    }
    temp++:

    if(currentDcoValue != nextDcoValue){
      DCO_writeValue(nextDcoValue);
      currentDcoValue = nextDcoValue;
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

void loadDac(unsigned int value){

  // Set output value
  DAC_BUS = value;

   // load DAC input register
  DAC_WR_LD = 0;

  // load DAC register
  DAC_WR_LD = 1;
}

//TODO:
// The connections between the DAC and SH boards are reversed. To fix this,
// shift register address bits and dac ordering are reversed here. Reset this
// once the hardware is corrected.

void writeValuesToSH(char sr_output){

  // put s&h into hold mode
  SH_EN = 0;

  //TODO: Switch DAC A/B outputs later.
  // select and load DAC B
  DAC_ADDRESS = 1;

  loadDac(OUT_activeBuffer[sr_output] + 0x8000);

  //TODO: Switch DAC A/B outputs later.
  // select and load DAC A
  DAC_ADDRESS = 0;

  loadDac(OUT_activeBuffer[SR_OUTPUTS + sr_output] + 0x8000);

  // set SH address

  // TODO: The S&H is miswired so the bit order here is a work around while
  // waiting for the corrected PCB
  // DAC_BUS = sr_output;

  DAC_BUS.b0 = sr_output.b1;
  DAC_BUS.b1 = sr_output.b0;
  DAC_BUS.b2 = sr_output.b3;
  DAC_BUS.b3 = sr_output.b2;

  // let values settle
  delay_cyc(20);

  // put s&h into sample mode, exposing the addressed s&h for the DAC output.
  SH_EN = 1;

  // now go away and let the S&H sample untill the next SH should be loaded
}

void initDacPorts(){

  DAC_ADDRESS = 0;
  DAC_ADDRESS_TRIS = 0;

  // data is loaded into input register on falling edge so it must initially
  // be high.
  DAC_WR_LD = 1;
  DAC_WR_LD_TRIS = 0;

  SH_EN = 0;
  SH_EN_TRIS = 0;

  DAC_BUS = 0;
  DAC_BUS_TRIS = 0;
}

void DAC_startTimer(){
  //Prescaler 1:1; PR1 Preload = 2; Actual Interrupt Time = 25 ns

  // enable and clear interrupt
  T1IE_bit = 1;
  T1IF_bit = 0;

  // set interrupt priority
  T1IP0_bit = 1;
  T1IP1_bit = 1;
  T1IP2_bit = 1;


  // set period = 25uS
  PR1 = 2000;

  // clear timer
  TMR1 = 0;

  // start timer
  T1CON = 0x8000;
}

void DAC_init(){

  initDacPorts();

  //necessary to start runMatrix.
  DAC_dacUpdatesFinished = 0;

  // set DAC outputs to center
  DAC_ADDRESS = 1;
  loadDac(0x8000);

  DAC_ADDRESS = 0;
  loadDac(0x8000);

}