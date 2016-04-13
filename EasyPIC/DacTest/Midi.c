#include "Midi.internal.h"
#include "MidiCore.h"
#include "MidiStatusMessages.h"
#include "Types.h"
#include "Matrix.h"

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