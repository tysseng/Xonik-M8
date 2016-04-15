#include "matrix.h"
#include "AnalogInputs.internal.h"
#include <stdlib.h>
 
short prevPotmeterDirection[NUMBER_OF_POTMETERS];
int potmeterValues[NUMBER_OF_POTMETERS];

void AI_init() {
  AD1PCFG = 0xB8FF;              // Configure AN pins as digital I/O, PORTB.B0 as analog
  JTAGEN_bit = 0;                // Disable JTAG port
  TRISB = TRISB | 0xFF00;        // Set PORTB.B0 as input
  ADC1_Init();                   // Initialize ADC module
  Delay_ms(100);
}

void AI_readPotmeters(){
  short i;
  unsigned int sample;

  for(i=0; i<NUMBER_OF_POTMETERS; i++){
    updateIfChanged(i, ADC1_Get_Sample(i));
  }
}

void updateIfChanged(char i, unsigned int sample){
  int direction = sample - potmeterValues[i];

  if(direction > 0) {
    direction = 1;
  } else if(direction < 0){
    direction = -1;
  }

  if(direction == prevPotmeterDirection[i] || prevPotmeterDirection[i] == 0){
    // rotation in same direction is always ok
    updatePotmeterValue(i, direction, sample);

  } else if(direction < 0 && sample < 3 || direction > 0 && sample > 1020){
    // rotation in opposite direction for changes less than 3 is ok if close
    // to the top or bottom (to allow reaching 0 and max)
    updatePotmeterValue(i, direction, sample);

  } else if(abs(potmeterValues[i] - sample) > 2){
    // when changing direction, change has to be more than 2
    updatePotmeterValue(i, direction, sample);

  }
}

void updatePotmeterValue(char pot, char direction, int value){
  MX_nodeResults[3+pot] = value << 5;
  potmeterValues[pot] = value;
  prevPotmeterDirection[pot] = direction;
}