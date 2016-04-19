#include "test/munit.h"
#include "test/asserts.h"
#include "Tune.h"
#include "Matrix.h"
#include "Config.h"

long tuneResult;

void resetTune(){
  TUNE_init();
}

void test_successful_correction(){
  tuneResult = 100;

  TUNE_retune();

  assertEquals(1, TUNE_isTuneable[0][CONF_SEMITONE_LOWEST], "Should have passed tuning");
  assertEquals(100, TUNE_compuTuneCorrections[0][CONF_SEMITONE_LOWEST], "Should have stored tune result");
}

void test_that_only_tones_in_range_are_computuned(){

  tuneResult = 100;
  
  TUNE_retune();
  
  assertEquals(0, MX_vcoTuning[0][0], "Semitone 0 should not have been tuned");
  assertEquals(0, MX_vcoTuning[0][CONF_SEMITONE_LOWEST-1], "Semitone SEMITONE_LOWEST-1 should not have been tuned");
  assertEquals(100, MX_vcoTuning[0][CONF_SEMITONE_LOWEST], "Semitone SEMITONE_LOWEST should have been tuned");
  assertEquals(100, MX_vcoTuning[0][CONF_SEMITONE_HIGHEST], "Semitone SEMITONE_HIGHEST should have been tuned");
  assertEquals(0, MX_vcoTuning[0][CONF_SEMITONE_HIGHEST+1], "Semitone SEMITONE_HIGHEST+1 should not have been tuned");
  assertEquals(0, MX_vcoTuning[0][127], "Semitone 127 should not have been tuned");
}

void test_that_untunable_is_set_if_correction_is_outside_int_range(){
  tuneResult = 32768;
  
  TUNE_retune();
  assertEquals(0, MX_vcoTuning[0][CONF_SEMITONE_LOWEST], "Semitone should not be tuned");
  assertEquals(0, TUNE_isTuneable[0][CONF_SEMITONE_LOWEST], "Semitone should not be tunable");
  assertEquals(0, TUNE_allAreTuneable, "All should not be tunable");

  TUNE_init();
  tuneResult = -32769;

  TUNE_retune();
  assertEquals(0, MX_vcoTuning[0][CONF_SEMITONE_LOWEST], "Semitone should not be tuned");
  assertEquals(0, TUNE_isTuneable[0][CONF_SEMITONE_LOWEST], "Semitone should not be tunable");
  assertEquals(0, TUNE_allAreTuneable, "All should not be tunable");
}

void test_that_untunable_is_set_if_new_pitch_outside_int_range_in_computune(){
  tuneResult = 32767; // should pass correction check but not pitch

  TUNE_retune();
  assertEquals(0, MX_vcoTuning[0][CONF_SEMITONE_HIGHEST], "Semitone should not be tuned");
  assertEquals(0, TUNE_isTuneable[0][CONF_SEMITONE_HIGHEST], "Semitone should not be tunable");
  assertEquals(0, TUNE_allAreTuneable, "All should not be tunable");

  TUNE_init();
  tuneResult = -32768; // should pass correction check but not pitch

  TUNE_retune();
  assertEquals(0, MX_vcoTuning[0][CONF_SEMITONE_LOWEST], "Semitone should not be tuned");
  assertEquals(0, TUNE_isTuneable[0][CONF_SEMITONE_LOWEST], "Semitone should not be tunable");
  assertEquals(0, TUNE_allAreTuneable, "All should not be tunable");
}

void test_that_only_tones_in_range_are_manually_tuned(){

  TUNE_updateGlobalTuning(100);

  assertEquals(0, MX_vcoTuning[0][0], "Semitone 0 should not have been tuned");
  assertEquals(0, MX_vcoTuning[0][CONF_SEMITONE_LOWEST-1], "Semitone SEMITONE_LOWEST-1 should not have been tuned");
  assertEquals(100, MX_vcoTuning[0][CONF_SEMITONE_LOWEST], "Semitone SEMITONE_LOWEST should have been tuned");
  assertEquals(100, MX_vcoTuning[0][CONF_SEMITONE_HIGHEST], "Semitone SEMITONE_HIGHEST should have been tuned");
  assertEquals(0, MX_vcoTuning[0][CONF_SEMITONE_HIGHEST+1], "Semitone SEMITONE_HIGHEST+1 should not have been tuned");
  assertEquals(0, MX_vcoTuning[0][127], "Semitone 127 should not have been tuned");
}

void test_successful_global_tuning(){

  TUNE_compuTuneCorrections[0][CONF_SEMITONE_LOWEST] = 200;
  
  TUNE_updateGlobalTuning(100);

  assertEquals(1, TUNE_isTuneable[0][CONF_SEMITONE_LOWEST], "Should have passed tuning");
  assertEquals(300, MX_vcoTuning[0][CONF_SEMITONE_LOWEST], "Should have summed tune results");
}


void test_that_tones_that_failed_computune_are_not_global_tuned(){

  TUNE_isTuneable[0][CONF_SEMITONE_LOWEST] = 0;
  TUNE_updateGlobalTuning(100);

  assertEquals(0, MX_vcoTuning[0][CONF_SEMITONE_LOWEST], "Semitone SEMITONE_LOWEST should not have been tuned");
  assertEquals(0, TUNE_allAreTuneable, "All should not be tunable");
}


void test_that_untunable_is_set_if_new_pitch_outside_int_range_in_global_tuning(){

  TUNE_updateGlobalTuning(32767);
  
  assertEquals(0, MX_vcoTuning[0][CONF_SEMITONE_HIGHEST], "Semitone should not be tuned");
  assertEquals(0, TUNE_isTuneable[0][CONF_SEMITONE_HIGHEST], "Semitone should not be tunable");
  assertEquals(0, TUNE_allAreTuneable, "All should not be tunable");

  TUNE_init();

  TUNE_updateGlobalTuning(-32768);

  assertEquals(0, MX_vcoTuning[0][CONF_SEMITONE_LOWEST], "Semitone should not be tuned");
  assertEquals(0, TUNE_isTuneable[0][CONF_SEMITONE_LOWEST], "Semitone should not be tunable");
  assertEquals(0, TUNE_allAreTuneable, "All should not be tunable");
}


// setup and run test suite
void runTuneTests(){
  resetTests();

  add(&test_successful_correction);
  add(&test_that_only_tones_in_range_are_computuned);
  add(&test_that_only_tones_in_range_are_manually_tuned);
  add(&test_that_untunable_is_set_if_correction_is_outside_int_range);
  add(&test_that_untunable_is_set_if_new_pitch_outside_int_range_in_computune);
  
  add(&test_successful_global_tuning);
  add(&test_that_tones_that_failed_computune_are_not_global_tuned);
  add(&test_that_untunable_is_set_if_new_pitch_outside_int_range_in_global_tuning);
  run(resetTune);
}