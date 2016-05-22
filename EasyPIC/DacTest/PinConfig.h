#ifndef _PIN_CONFIG_H
#define _PIN_CONFIG_H

#define DAC_ADDRESS LATE0_bit
#define DAC_ADDRESS_TRIS TRISE0_bit

#define DAC_WR_LD LATE1_bit
#define DAC_WR_LD_TRIS TRISE1_bit

// NB: address bus is shared shared between the two multiplexers, so unless
// both dac outputs are set correctly for the same output of the two mux'es,
// sampling will not work correctly.
#define SH_EN LATE2_bit
#define SH_EN_TRIS TRISE2_bit

// Dac bus is shared between DAC value input and sample & hold mux output select.
#define DAC_BUS LATD
#define DAC_BUS_TRIS TRISD

#endif