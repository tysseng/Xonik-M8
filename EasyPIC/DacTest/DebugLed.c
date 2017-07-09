#include "PinConfig.h"

#define DEBUG_LED_ON 0
#define DEBUG_LED_OFF 1
#define DEBUG_LED_DELAY 50

void LED_flash1(char times){
  char i;
  for(i=0; i< times; i++){
    DEBUG_LED_1 = DEBUG_LED_ON;
    delay_ms(DEBUG_LED_DELAY);
    DEBUG_LED_1 = DEBUG_LED_OFF;
    delay_ms(DEBUG_LED_DELAY);
  }
}

void LED_flash2(char times){
  char i;
  for(i=0; i< times; i++){
    DEBUG_LED_2 = DEBUG_LED_ON;
    delay_ms(DEBUG_LED_DELAY);
    DEBUG_LED_2 = DEBUG_LED_OFF;
    delay_ms(DEBUG_LED_DELAY);
  }
}

void LED_init() {
  DEBUG_LED_TRIS_1 = 0;
  DEBUG_LED_TRIS_2 = 0;
}