#include "Midi.internal.h"
#include "MidiCore.h"
#include "MidiStatusMessages.h"
#include "Types.h"
#include "Matrix.h"

// TODO: Configure controllers via SPI.

// maps midi controllers to input positions in the matrix
void MIDI_controllerToInputMap[127];

// configures controller resolution, if set to 1 CC will only be written when
// fine-res arrives.
char MIDI_controllerHiRes[32];
int lastLowResValue[32];

void MIDI_HOOK_treatTwoByteMessage(char channel, char status, char param1){
}

void MIDI_HOOK_treatThreeByteMessage(char channel, char status, char param1, char param2){
  switch(status){
    case SM_NOTE_ON:
      MX_noteOn(param1, param2);
      break;
    case SM_NOTE_OFF:
      MX_noteOff();
      break;
    case SM_CC:
      if(param1 < 32 && MIDI_controllerHiRes[param1]){
        // 14 bit CCs
        if(param1 >= 0x20 && param1 <= 0x3F){
          MX_nodeResults[MIDI_controllerToInputMap[param1]] = lastLowResValue[param1] << 7 | param2;
        } else {
          lastLowResValue[param1] = param2;
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

}