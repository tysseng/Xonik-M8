#include "Midi.internal.h"
#include "MidiCore.h"
#include "MidiStatusMessages.h"
#include "Types.h"
#include "Matrix.h"
#include "Config.h"

// TODO: Configure controllers via SPI.


int lastPartialCCValue[32];
char lowPartialCCsReceived[32];
char highPartialCCsReceived[32];

void MIDI_HOOK_treatTwoByteMessage(char channel, char status, char param1){
}

void MIDI_HOOK_treatThreeByteMessage(char channel, char status, char param1, char param2){
  char lowResPos;
  
  switch(status){
    case SM_NOTE_ON:
      if(param1 < CONF_SEMITONE_LOWEST || param1 > CONF_SEMITONE_HIGHEST){
        break;
      }
      MX_noteOn(param1, param2);
      break;
    case SM_NOTE_OFF:
      if(param1 < CONF_SEMITONE_LOWEST || param1 > CONF_SEMITONE_HIGHEST){
        break;
      }
      MX_noteOff();
      break;
    case SM_CC:
      if(param1 < 32 && MIDI_controllerHiRes[param1]){
        lowPartialCCsReceived[param1]++;
        
        if(lowPartialCCsReceived[param1] == highPartialCCsReceived[param1]){
          MX_nodeResults[MIDI_controllerToInputMap[param1]] = (param2 << 8) | (lastPartialCCValue[param1] << 1);
        } else {
          lastPartialCCValue[param1] = param2;
        }
      } else if(param1 >= 0x20 && param1 <= 0x3F){
        lowResPos = param1 - 0x20;
        highPartialCCsReceived[lowResPos]++;

        if(lowPartialCCsReceived[lowResPos] == highPartialCCsReceived[lowResPos]){
          MX_nodeResults[MIDI_controllerToInputMap[lowResPos]] = (lastPartialCCValue[lowResPos] << 8) | (param2 << 1);
        } else {
          lastPartialCCValue[lowResPos] = param2;
        }
      } else {
        // 7 bit CCs
        MX_nodeResults[MIDI_controllerToInputMap[param1]] = param2 << 8;
      }
      break;
  }
}

void MIDI_HOOK_treatTuneRequest(){
}

void MIDI_HOOK_treatRealtimeStatus(char status){
}

void MIDI_HOOK_treatSysexByte(char midiByte, char bytePosition){
}

void MIDI_HOOK_sysexAborted(){

}

void MIDI_init(){
  char i;
  for(i=0; i<32; i++){
    lastPartialCCValue[i] = 0;
    lowPartialCCsReceived[i] = 0;
    highPartialCCsReceived[i] = 0;
  }
}