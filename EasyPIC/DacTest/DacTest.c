// Hardware improvements:
// ----------------------
// A0 and A1 may be connected as long as we only want to set one at the time
// D0-15 should be part of a single 16bit port.
// SH_EN0 and SH_EN1 may be connected as long as we want to populate both simultaneously
// _RS may be connected to 1 as we can reset the DACs manually - just make sure
// to turn down master volume on startup.

// The connections between the DAC and SH boards are reversed. To fix this,
// shift register address bits and dac ordering are reversed here. Reset this
// once the hardware is corrected.

// Project settings:
// -----------------
// PLL Input Divider: 2x
// PLL Multiplier: 20x
// Oscillator Selection Bits: Primary Osc w/PLL
// Primary Oscillator Configuration: XT osc mode

//#define RUNTESTS
//#define UNIT_TEST_SPI
//#define MOCK_SPI

#include "Dac.h"
#include "Spi.h"
#include "Matrix.h"
#include "TestMatrix.h"
#include "Output.h"
#include "built_in.h"
#include "DacTest.test.h"

#ifdef RUNTESTS
  #include "Spi.test.h"
#endif


#ifdef RUNTESTS
void main() {
  char i = 0;
  char dacIncrements = 0;
  MX_resetMatrix();
  DAC_dacUpdatesFinished = 1;
  OUT_init();
  
  TM_setupTestMatrix();
  MX_runMatrix();

  #ifdef UNIT_TEST_SPI
  runSpiTests();
  #endif
  
  #ifdef MOCK_SPI
  while(1){
    // only increment dac every two cycles, tests that matrix is not recalculated
    // while dac is writing.
    if(dacIncrements % 1 == 0){
      DAC_step();
    }
    dacIncrements++;
    
    if(DAC_dacUpdatesFinished){
      updateControllerFromSpi(0, i++);
      DAC_dacUpdatesFinished = 0;
      MX_runMatrix();
    }
  }
  #endif
}
#endif

#ifndef RUNTESTS
void main() {
  DAC_init();
  SPI_init();
  EnableInterrupts();
  MX_resetMatrix();
  TM_setupTestMatrix();
  
  OUT_init();

  // calculate initial state. dacUpdatesFinished will be 0, so any ramps
  // will not be incremented.
  MX_runMatrix();

  // start the dac
  DAC_startTimer();

  while(1){
    SPI_checkForReceivedData();

    if(DAC_dacUpdatesFinished){
      DAC_dacUpdatesFinished = 0;
      MX_runMatrix();
    }
  }
}
#endif

/*
TODO:
- tuning lookup
- exponential lookup
- SPI input
- distance-in-samples-per-cents
- multi stage envelopes (inc looping?)
- LFOs
- quantizer - quantize to semitone or other unit
- glide/slide/resistance
- Trigger (sends trigger pulse if input is high)
- set og reset denne intervalMultiplier
- At start: prepare everything, then wait for start signal on pin with interrupt
- Sync dac clock by using pin with interrupt instead of timer? will give
  synchronizable LFOs.

Mathematical expressions
- divide
- average

Outputs
- CV
- trigger pulse (for analog envelope)
- gate (for analog envelope)
- other binary pins (controlling switches etc)
*/