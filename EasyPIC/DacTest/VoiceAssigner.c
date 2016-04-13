#include "Spi.h"

#define VOICE_COUNT 8

// group to receive on for each voice
char groupForVoice[VOICE_COUNT];
short currentPitch[VOICE_COUNT];

void VA_noteOn(char group, char pitch, char velocity){
  char i;

  // First-pressed priority
  for(i = 0; i<VOICE_COUNT; i++){
    if(groupForVoice[i] == group && currentPitch[i] == -1){
      currentPitch[i] = pitch;
      SPI_SEND_noteOn(i, pitch, velocity);
    }
  }
}

void VA_noteOff(char group, char pitch, char velocity){
  char i;

  // First-pressed priority
  for(i = 0; i<VOICE_COUNT; i++){
    if(groupForVoice[i] == group && currentPitch[i] == pitch){
      currentPitch[i] = -1;
      SPI_SEND_noteOff(i);
    }
  }
}

// todo: extend with length of data
void VA_sendToGroup(char group, char dataBytes ){
  char i;

  for(i = 0; i<VOICE_COUNT; i++){
    if(groupForVoice[i] == group){
      //sendToGroup(dataBytes);
    }
  }
}