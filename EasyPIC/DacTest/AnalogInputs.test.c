#include "test/munit.h"
#include "test/asserts.h"
#include "AnalogInputs.internal.h"
#include "Matrix.h"

void resetAnalogInputs(){
  char i;
  
  for(i=0; i<NUMBER_OF_POTMETERS; i++){
    MX_nodeResults[3+i] = 0;
    prevPotmeterDirection[i] = 0;
    potmeterValues[i] = 512;
  }
}

void test_that_initial_up_changes(){
  updateIfChanged(0, 513);
  
  assertEquals(16416, MX_nodeResults[3], "node results not updated");
  assertEquals(513, potmeterValues[0], "potmeter value not updated");
  assertEquals(1, prevPotmeterDirection[0], "direction not updated");
}

void test_that_initial_down_changes(){
  updateIfChanged(0, 511);

  assertEquals(16352, MX_nodeResults[3], "node results not updated");
  assertEquals(511, potmeterValues[0], "potmeter value not updated");
  assertEquals(-1, prevPotmeterDirection[0], "direction not updated");
}

void test_that_changes_less_than_3_is_ignored_on_change_to_down(){
  prevPotmeterDirection[0] = 1;
  updateIfChanged(0, 510);

  assertEquals(512, potmeterValues[0], "potmeter value should not be updated");
  assertEquals(1, prevPotmeterDirection[0], "direction should not be updated");
}

void test_that_changes_less_than_3_is_ignored_on_change_to_up(){
  prevPotmeterDirection[0] = -1;
  updateIfChanged(0, 514);

  assertEquals(512, potmeterValues[0], "potmeter value should not be updated");
  assertEquals(-1, prevPotmeterDirection[0], "direction should not be updated");
}

void test_that_changes_of_3_is_performed_on_change_to_down(){
  prevPotmeterDirection[0] = 1;
  updateIfChanged(0, 509);

  assertEquals(509, potmeterValues[0], "potmeter value not updated");
  assertEquals(-1, prevPotmeterDirection[0], "direction not updated");
}

void test_that_changes_of_3_is_performed_on_change_to_up(){
  prevPotmeterDirection[0] = -1;
  updateIfChanged(0, 515);

  assertEquals(515, potmeterValues[0], "potmeter value not updated");
  assertEquals(1, prevPotmeterDirection[0], "direction not updated");
}

void test_that_changes_of_1_is_performed_when_no_direction_change_up(){
  prevPotmeterDirection[0] = 1;
  updateIfChanged(0, 513);

  assertEquals(513, potmeterValues[0], "potmeter value not updated");
}

void test_that_changes_of_1_is_performed_when_no_direction_change_down(){
  prevPotmeterDirection[0] = -1;
  updateIfChanged(0, 511);

  assertEquals(511, potmeterValues[0], "potmeter value not updated");
}

void test_that_change_to_down_for_1_when_close_to_0(){
  prevPotmeterDirection[0] = 1;
  potmeterValues[0] = 3;
  updateIfChanged(0, 2);

  assertEquals(2, potmeterValues[0], "potmeter value not updated");
  assertEquals(-1, prevPotmeterDirection[0], "direction not updated");
}

void test_that_change_to_up_for_1_when_close_to_1023(){
  prevPotmeterDirection[0] = -1;
  potmeterValues[0] = 1021;
  updateIfChanged(0, 1022);

  assertEquals(1022, potmeterValues[0], "potmeter value not updated");
  assertEquals(1, prevPotmeterDirection[0], "direction not updated");
}


// setup and run test suite
void runAnalogInputsTests(){
  resetTests();
  resetAnalogInputs();

  add(&test_that_initial_up_changes);
  add(&test_that_initial_down_changes);
  add(&test_that_changes_less_than_3_is_ignored_on_change_to_down);
  add(&test_that_changes_less_than_3_is_ignored_on_change_to_up);
  add(&test_that_changes_of_3_is_performed_on_change_to_down);
  add(&test_that_changes_of_3_is_performed_on_change_to_up);
  add(&test_that_changes_of_1_is_performed_when_no_direction_change_up);
  add(&test_that_changes_of_1_is_performed_when_no_direction_change_down);
  add(&test_that_change_to_down_for_1_when_close_to_0);
  add(&test_that_change_to_up_for_1_when_close_to_1023);
  run(resetAnalogInputs);
}