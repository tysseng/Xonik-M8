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
#include "built_in.h"

void initADC() {
  AD1PCFG = 0xB8FF;              // Configure AN pins as digital I/O, PORTB.B0 as analog
  JTAGEN_bit = 0;                // Disable JTAG port
  TRISB0_bit = 1;                // Set PORTB.B0 as input
  ADC1_Init();                   // Initialize ADC module
  Delay_ms(100);
}

void readPotmeters(){
  outputVals[0] = ADC1_Get_Sample(8) << 6;   // Get ADC value from corresponding channel
  outputVals[1] = ADC1_Get_Sample(9) << 6;   // Get ADC value from corresponding channel
  outputVals[2] = ADC1_Get_Sample(10) << 6;   // Get ADC value from corresponding channel
  outputVals[3] = ADC1_Get_Sample(14) << 6;   // Get ADC value from corresponding channel*/
}

void main() {
  TRISA = 0;
  initADC();
  initDac();
  EnableInterrupts();

  while(1){
    readPotmeters();
  // do nothing

  }
}