#include "test/munit.h"
#include "test/asserts.h"
#include "Midi.internal.h"
#include "MidiCore.h"
#include "MidiStatusMessages.h"
#include "Matrix.h"

void resetMidi(){
  MX_nodeResults[MATRIX_INPUT_PITCH] = 0;
  MX_nodeResults[MATRIX_INPUT_VELOCITY] = 0;
  MX_nodeResults[MATRIX_INPUT_GATE] = 0;
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
  assertEquals(-13107, keyToMatrixMapper[36], "C2 incorrect");
  assertEquals(-6553, keyToMatrixMapper[48], "C3 incorrect");
  assertEquals(0, keyToMatrixMapper[60], "C4 incorrect");
  assertEquals(6553, keyToMatrixMapper[72], "C5 incorrect");
  assertEquals(13107, keyToMatrixMapper[84], "C6 incorrect");
}

// setup and run test suite
void runMidiTests(){
  resetTests();

  add(&test_that_note_on_writes_to_matrix);
  add(&test_that_note_off_writes_to_matrix);
  add(&test_that_pitches_are_rounded_correctly);
  run(resetMidi);
}