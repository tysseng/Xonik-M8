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

#include "Dac.h"

void main() {
  initDac();
  EnableInterrupts();

  while(1){
  // do nothing

  }
}