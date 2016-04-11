#include "test/munit.h"
#include "test/asserts.h"
#include "MidiCore.h"
#include "MidiCore.internal.h"
#include "MidiStatusMessages.h"
#include "Matrix.h"

void resetMidiCore(){
}

void test_that_note_on_is_triggered_from_midi(){
  writeToRxBuffer_Test(SM_NOTE_ON);
  writeToRxBuffer_Test(72); // c5
  writeToRxBuffer_Test(64); // velocity
 
  MIDI_CORE_readFromRxBuffer();

  assertEquals(6553, MX_nodeResults[MATRIX_INPUT_PITCH], "pitch not set");
  assertEquals(16384, MX_nodeResults[MATRIX_INPUT_VELOCITY], "velocity not set");
  assertEquals(32767, MX_nodeResults[MATRIX_INPUT_GATE], "gate not set");
}

void test_that_note_off_is_triggered_from_midi(){
  MX_nodeResults[MATRIX_INPUT_VELOCITY] = 16384;
  MX_nodeResults[MATRIX_INPUT_GATE] = 32767;

  writeToRxBuffer_Test(SM_NOTE_OFF);
  writeToRxBuffer_Test(72); // c5
  writeToRxBuffer_Test(0); // velocity

  MIDI_CORE_readFromRxBuffer();

  assertEquals(0, MX_nodeResults[MATRIX_INPUT_VELOCITY], "velocity not reset");
  assertEquals(0, MX_nodeResults[MATRIX_INPUT_GATE], "gate not reset");
}

// setup and run test suite
void runMidiCoreTests(){
  resetTests();

  add(&test_that_note_on_is_triggered_from_midi);
  add(&test_that_note_off_is_triggered_from_midi);
  run(resetMidiCore);
}