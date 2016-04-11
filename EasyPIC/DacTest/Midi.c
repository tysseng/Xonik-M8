#include "Midi.internal.h"
#include "MidiCore.h"
#include "MidiStatusMessages.h"
#include "Types.h"
#include "Matrix.h"

// maps midi key (pitch) to matrix 1v/oct representation.
int keyToMatrixMapper[127];

void MIDI_HOOK_treatTwoByteMessage(char channel, char status, char param1){
}

void MIDI_HOOK_treatThreeByteMessage(char channel, char status, char param1, char param2){
  switch(status){
    case SM_NOTE_ON:
      sendNoteOnToMatrix(param1, param2);
      break;
    case SM_NOTE_OFF:
      sendNoteOffToMatrix();
      break;
  }
}

void MIDI_HOOK_treatTuneRequest(){
}

void MIDI_HOOK_treatRealtimeStatus(){
}

void MIDI_HOOK_treatSysexByte(char midiByte, char bytePosition){
}

void MIDI_HOOK_sysexAborted(){

}

void sendNoteOnToMatrix(char pitch, char velocity){
  MX_nodeResults[MATRIX_INPUT_PITCH] = keyToMatrixMapper[pitch];
  MX_nodeResults[MATRIX_INPUT_VELOCITY] = velocity << 8; // max velocity midi = 127
  MX_nodeResults[MATRIX_INPUT_GATE] = 0x7FFF;
}

void sendNoteOffToMatrix(){
  MX_nodeResults[MATRIX_INPUT_VELOCITY] = 0;
  MX_nodeResults[MATRIX_INPUT_GATE] = 0;
}

void initKeyToMatrixValue(){

  // With 1V/oct: max range = -5 to +5V = 10 octaves = 120 semitones.
  // Midi represents a maximum of 128 semitones.

  // We'll choose C4 as midi key number 60, this gives 21 = A0 and 108 = C8.
  // We'll place C4 at 0V.

  // To represent 1/12V: 32768 / 60 = 546,1333...

  char i;

  long semitone = 32768000 / 60;

  for(i = 0; i < 121; i++){
    keyToMatrixMapper[i] = ((i - 60) * semitone) / 1000;
  }
  
  // we are not able to represent 121 to 127 correctly but must
  // at least make sure nothing breaks if the values are received.
  for(i=121; i<127; i++){
    keyToMatrixMapper[i] = keyToMatrixMapper[120];
  }
}

void MIDI_init(){
  initKeyToMatrixValue();
}