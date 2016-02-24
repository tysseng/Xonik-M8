// Hardware improvements:
// ---------------------//-
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

#include "Dac.h"
#include "Adc.h"
#include "Spi.h"
#include "Matrix.h"
#include "Output.h"
#include "built_in.h"

void main() {
  DAC_init();
  SPI_init();
  EnableInterrupts();

  // calculate initial state. dacUpdatesFinished will be 0, so any ramps
  // will not be incremented.
  MX_runMatrix();

  // start the dac
  DAC_startTimer();
    
  while(1){
    SPI_checkForReceivedData();
    if(DAC_dacUpdatesFinished){
      DAC_dacUpdatesFinished = 0;
      DAC_intervalMultiplier = 0;
      MX_runMatrix();
    }
  }
}

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

Mathematical expressions
- divide
- average

Outputs
- CV
- trigger pulse (for analog envelope)
- gate (for analog envelope)
- other binary pins (controlling switches etc)
*/