#include "Dac.h"

void initADC() {
  AD1PCFG = 0xB8FF;              // Configure AN pins as digital I/O, PORTB.B0 as analog
  JTAGEN_bit = 0;                // Disable JTAG port
  TRISB = TRISB | 0xFF00;                // Set PORTB.B0 as input
  ADC1_Init();                   // Initialize ADC module
  Delay_ms(100);
}

void readPotmeters(){
  unsigned int val = ADC1_Get_Sample(14) << 6;

  outputVals[0] = ADC1_Get_Sample(8) << 6;   // Get ADC value from corresponding channel
  outputVals[1] = ADC1_Get_Sample(9) << 6;   // Get ADC value from corresponding channel
  outputVals[2] = ADC1_Get_Sample(10) << 6;   // Get ADC value from corresponding channel
  outputVals[3] = ADC1_Get_Sample(14) << 6;   // Get ADC value from corresponding channel

}