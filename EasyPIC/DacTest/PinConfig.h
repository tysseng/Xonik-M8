#ifndef _PIN_CONFIG_H
#define _PIN_CONFIG_H


// **** SPI out VC port ****
// SPI: SPI4 in newest datasheet, SPI3A in old and in eagle drawings, see Dco.c

// 4: pin 20, RB5/AN5
#define TUNE_IN LATB5_bit
#define TUNE_IN_TRIS TRISB5_bit

// 5: pin 23, RB2/AN2
#define TUNE_A0 LATB2_bit
#define TUNE_A0_TRIS TRISB2_bit

// 6: pin 22, RB3/AN3
#define TUNE_A1 LATB3_bit
#define TUNE_A1_TRIS TRISB3_bit

// **** Control port ****
// 1: pin 93, RE0
#define DAC_ADDRESS LATE0_bit
#define DAC_ADDRESS_TRIS TRISE0_bit

// 2: pin 94, RE1 (SR-A0)
#define DAC_WR_LD LATE1_bit
#define DAC_WR_LD_TRIS TRISE1_bit

// 3: pin 98, RE2
// NB: address bus is shared shared between the two multiplexers, so unless
// both dac outputs are set correctly for the same output of the two mux'es,
// sampling will not work correctly.
#define SH_EN LATE2_bit
#define SH_EN_TRIS TRISE2_bit

// 4: pin 99, RE3 (SR-A2)
#define DIG_OUT2_0 LATE3_bit
#define DIG_OUT2_0_TRIS TRISE3_bit

// 5: pin 100, RE4
#define DIG_OUT2_1 LATE3_bit
#define DIG_OUT2_1_TRIS TRISE3_bit

// 6: pin 3, RE5
#define DIG_OUT2_2 LATE3_bit
#define DIG_OUT2_2_TRIS TRISE3_bit

// 7: pin 4, RE6
#define DIG_OUT2_3 LATE3_bit
#define DIG_OUT2_3_TRIS TRISE3_bit

// 8: pin 5, RE7
#define DIG_OUT2_4 LATE3_bit
#define DIG_OUT2_4_TRIS TRISE3_bit

// **** Address bus port ****
// Dac bus is shared between DAC value input and sample & hold mux output select.
#define DAC_BUS LATD
#define DAC_BUS_TRIS TRISD

// **** Output port ****
// low part of RA
#define DIG_OUT LATAL
#define DIG_OUT_TRIS TRISAL

// **** Input port ****
// high part of RB
#define DIG_IN LATBH
#define DIG_IN_TRIS TRISBH

// **** MIDI port ****
// UART1, see MidiCore.c

// **** Interrupts port ****
// 1: pin 18, RE8
#define INT_1 LATE8_bit
#define INT_1_TRIS TRISE8_bit

// 2: pin 19, RE9
#define INT_2 LATE9_bit
#define INT_2_TRIS TRISE9_bit

// 3: pin 66, RA14
#define INT_3 LATA14_bit
#define INT_3_TRIS TRISA14_bit

// 4: pin 67, RA15
#define INT_4 LATE15_bit
#define INT_4_TRIS TRISE15_bit

// 5: pin 32, RB7/AN7
#define DIG_IN2_0 LATB7_bit
#define DIG_IN2_0_TRIS TRISB7_bit

// 6: pin 33, RB6/AN6
#define DIG_IN2_1 LATB6_bit
#define DIG_IN2_1_TRIS TRISB6_bit

// 7: pin 34, RA10
#define DIG_IN2_2 LATA10_bit
#define DIG_IN2_2_TRIS TRISA10_bit

// 8: pin 35, RA9
#define DIG_IN2_3 LATA9_bit
#define DIG_IN2_3_TRIS TRISA9_bit

// **** SPI in port ****
// SPI: SPI2 in newest datasheet, SPI2A in old and in eagle drawings, see Spi.c
// 5: SLAVE_INT = TX_INTERRUPT
#define SPI_IN_TX_INTERRUPT LATC4_bit
#define SPI_IN_TX_INTERRUPT_TRIS TRISC4_bit

// **** Debug LEDs ****
// 1: pin 6, RC1
#define DEBUG_LED_1 LATC1_bit
#define DEBUG_LED_TRIS_1 TRISC1_bit

// 2: pin 7, RC2
#define DEBUG_LED_2 LATC2_bit
#define DEBUG_LED_TRIS_2 TRISC2_bit

#endif