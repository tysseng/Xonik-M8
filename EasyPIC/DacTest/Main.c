// Speed, 4 nodes:
// Pointers: 32,51 - 27,79 = 4,72 uS.
// Array lookups without getParam(): 31,94 - 28,98 = 2,96 uS
// Pointers with 64bit struct: 33.30 - 31.18 = 2,12uS!
// Separate results array: 33,38 - 31,48 = 1,90uS

// NB: We get a penalty of 40uS in the runMatrix for-loop for each Node if the
// Node struct size is not on a binary number border - 32bytes, 64bytes etc.

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

#include "Dac.h"
#include "AnalogInputs.h"
#include "Spi.h"
#include "Matrix.h"
#include "TestMatrix.h"
#include "Output.h"
#include "MidiCore.h"
#include "Midi.h"
#include "built_in.h"
#include "Config.test.h"
#include "PinConfig.h"
#include "DebugLed.h"

#ifdef RUNTESTS
  #include "Spi.test.h"
  #include "Midi.test.h"
  #include "MidiCore.test.h"
  #include "AnalogInputs.test.h"
  #include "Tune.test.h"
  #include "Matrix.test.h"
#endif


#ifdef RUNTESTS
void main() {
  char i = 0;
  char dacIncrements = 0;
  MX_init();
  DAC_dacUpdatesFinished = 1;
  OUT_init();
  MIDI_init();
  MIDI_CORE_init();
  
  TM_setupTestMatrix();
  MX_runMatrix();

  #ifdef UNIT_TEST_SPI
  runSpiTests();
  #endif

  #ifdef UNIT_TEST_MIDI
  runMidiTests();
  #endif

  #ifdef UNIT_TEST_MIDI_CORE
  runMidiCoreTests();
  #endif

  #ifdef UNIT_TEST_ANALOG_INPUT
  runAnalogInputsTests();
  #endif

  #ifdef UNIT_TEST_TUNE
  runTuneTests();
  #endif
  
  #ifdef UNIT_TEST_MATRIX
  runMatrixTests();
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

unsigned int alive = 0;

#ifndef RUNTESTS
void main() {

  // disable JTAG to get control of all pins on PORTA/L
  JTAGEN_bit = 0;

  TRISA = 0;

  LED_init();
  
  AI_init();
  DAC_init();
  SPI_init();
  MIDI_init();
  MX_init();
  MIDI_CORE_init();
  
  EnableInterrupts();
  
  TM_setupTestMatrix();
  
  OUT_init();

  MX_nodeResults[0] = 1000;
  
  // calculate initial state. dacUpdatesFinished will be 0, so any ramps
  // will not be incremented.
  MX_runMatrix();

  // start the dac
  DAC_startTimer();

  // Tell the world that booting has completed
  LED_flash2(2);
  LED_flash1(2);

  while(1){
    if(alive == 0){
//      LED_flash2(1);
    }
    alive++;

    MIDI_CORE_readFromRxBuffer();

//    AI_readPotmeters();

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
- multi stage envelopes (inc looping?)
- LFOs
- quantizer - quantize to semitone or other unit
- glide/slide/resistance
- Trigger (sends trigger pulse if input is high)
- set og reset denne intervalMultiplier
- At start: prepare everything, then wait for start signal on pin with interrupt
- Sync dac clock by using pin with interrupt instead of timer? will give
  synchronizable LFOs.

- SPI: Request send to master if tuning and global tuning fails.
- SPI: Allow master to fetch list of tunings and failed tunings


Mathematical expressions
- divide
- average

Outputs
- CV
- trigger pulse (for analog envelope)
- gate (for analog envelope)
- other binary pins (controlling switches etc)
*/