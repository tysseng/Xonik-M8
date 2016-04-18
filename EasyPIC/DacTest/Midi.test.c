#include "test/munit.h"
#include "test/asserts.h"
#include "Midi.internal.h"
#include "MidiCore.h"
#include "MidiStatusMessages.h"
#include "Matrix.h"
#include "Config.h"

void resetMidi(){
  char i;
  for(i = 0; i<INPUTS + MAX_CONSTANTS + MAX_NODES; i++){
    MX_nodeResults[i] = 0;
  }
}

void test_that_note_on_writes_to_matrix(){
  MIDI_HOOK_treatThreeByteMessage(0, SM_NOTE_ON, 61, 64);
  
  assertEquals(546, MX_nodeResults[MATRIX_INPUT_PITCH], "pitch not set");
  assertEquals(16384, MX_nodeResults[MATRIX_INPUT_VELOCITY], "velocity not set");
  assertEquals(32767, MX_nodeResults[MATRIX_INPUT_GATE], "gate not set");
}

void test_that_note_off_writes_to_matrix(){
  MIDI_HOOK_treatThreeByteMessage(0, SM_NOTE_ON, 61, 64);
  MIDI_HOOK_treatThreeByteMessage(0, SM_NOTE_OFF, 61, 0);

  assertEquals(0, MX_nodeResults[MATRIX_INPUT_VELOCITY], "velocity not reset");
  assertEquals(0, MX_nodeResults[MATRIX_INPUT_GATE], "gate not reset");
}

void test_that_pitches_are_rounded_correctly(){
  assertEquals(-13107, MX_keyToMatrixMapper[36], "C2 incorrect");
  assertEquals(-6553, MX_keyToMatrixMapper[48], "C3 incorrect");
  assertEquals(0, MX_keyToMatrixMapper[60], "C4 incorrect");
  assertEquals(6553, MX_keyToMatrixMapper[72], "C5 incorrect");
  assertEquals(13107, MX_keyToMatrixMapper[84], "C6 incorrect");
}

void test_that_7_bit_cc_is_set_correctly(){
  MIDI_controllerToInputMap[2] = 4; // input position 4
  MIDI_controllerHiRes[2] = 0; // low res
  MIDI_HOOK_treatThreeByteMessage(0, SM_CC, 2, 64);
  assertEquals(16384, MX_nodeResults[4], "controller not set correctly");
}

void test_that_14_bit_cc_is_set_correctly_low_res_first(){
  MIDI_controllerToInputMap[2] = 4; // input position 4
  MIDI_controllerHiRes[2] = 1; // high res
  MIDI_HOOK_treatThreeByteMessage(0, SM_CC, 2, 64);
  assertEquals(0, MX_nodeResults[4], "controller should not be set before second byte arrives");
  MIDI_HOOK_treatThreeByteMessage(0, SM_CC, 34, 64);
  assertEquals(16512, MX_nodeResults[4], "controller not set correctly");
}

void test_that_14_bit_cc_is_set_correctly_high_res_first(){
  MIDI_controllerToInputMap[2] = 4; // input position 4
  MIDI_controllerHiRes[2] = 1; // high res
  MIDI_HOOK_treatThreeByteMessage(0, SM_CC, 34, 64);
  assertEquals(0, MX_nodeResults[4], "controller should not be set before second byte arrives");
  MIDI_HOOK_treatThreeByteMessage(0, SM_CC, 2, 64);
  assertEquals(16512, MX_nodeResults[4], "controller not set correctly");
}

// setup and run test suite
void runMidiTests(){
  resetTests();

  add(&test_that_note_on_writes_to_matrix);
  add(&test_that_note_off_writes_to_matrix);
  add(&test_that_pitches_are_rounded_correctly);
  add(&test_that_7_bit_cc_is_set_correctly);
  add(&test_that_14_bit_cc_is_set_correctly_low_res_first);
  add(&test_that_14_bit_cc_is_set_correctly_high_res_first);
  run(resetMidi);
}