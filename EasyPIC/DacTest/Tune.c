#include "Config.h"
#include "Config.test.h"
#include "Matrix.h"
#include "Tune.internal.h"
#ifdef UNIT_TEST_TUNE
  #include "Tune.test.h"
#endif

// TODO: Flash led next to tune pot/button if tuning fails (not all are tuneable)

// Current global tuning, for recalculation if compu tuning changes.
int globalTuning;

char TUNE_allAreTuneable;
char TUNE_isTuneable[3][127];

// Results from tuning, not including manual global tuning. Will be used
// as the basis for returning next time retune is run or if global tuning 
// changes.
int TUNE_compuTuneCorrections[3][127];

void TUNE_init(){
  char semitone;
  char vco;
  TUNE_allAreTuneable = 1;
  
  for(vco=0; vco<3; vco++){
    for(semitone=0; semitone<127; semitone++){
      TUNE_isTuneable[vco][semitone] = 1;
      MX_vcoTuning[vco][semitone] = 0;
      TUNE_compuTuneCorrections[vco][semitone] = 0;
    }
  }
}

char TUNE_updateGlobalTuning(int updatedGlobalTuning){
  TUNE_allAreTuneable = 1;
  updateGlobalTuning(updatedGlobalTuning);
}

char updateGlobalTuning(int updatedGlobalTuning){
  long correction;
  long newPitch;

  char vco;
  char semitone;

  for(vco=0; vco<3; vco++){
    for(semitone=CONF_SEMITONE_LOWEST; semitone<=CONF_SEMITONE_HIGHEST; semitone++){
      if(!TUNE_isTuneable[vco][semitone]){
        TUNE_allAreTuneable = 0;
        continue;
      }
      
      correction = TUNE_compuTuneCorrections[vco][semitone];
      newPitch = MX_keyToMatrixMapper[semitone] + correction + updatedGlobalTuning;

      if(newPitch >= -32768 && newPitch <= 32767){
        MX_vcoTuning[vco][semitone] = correction + updatedGlobalTuning;
      } else {
        TUNE_isTuneable[vco][semitone] = 0;
        // The sum of compuTune and global tuning
        MX_vcoTuning[vco][semitone] = 0;
        TUNE_allAreTuneable = 0;
      }
    }
  }
  return TUNE_allAreTuneable;
}

// TODO: Implement tuning
long tune(char vco, char semitone){
  #ifdef UNIT_TEST_TUNE
  return tuneResult;
  #else
  return 0;
  #endif
}

// Each semitone is tuned. As semitones are hopefully not far apart tuning wise,
// matrix pitch values are rounded off to the nearest semitone when looking up
// pitch correction before output to the DACs.
char TUNE_retune(){
  long correction;
  long newPitch;
  char vco;
  char semitone;
  
  TUNE_allAreTuneable = 1;

  // TODO: Stop matrix
  
  for(vco=0; vco<3; vco++){
    for(semitone=CONF_SEMITONE_LOWEST; semitone<=CONF_SEMITONE_HIGHEST; semitone++){
      correction = tune(vco, semitone);
      if(correction >= -32768 && correction <= 32767){ // within range of an int
        newPitch = MX_keyToMatrixMapper[semitone] + correction;
        
        if(newPitch >= -32768 && newPitch <= 32767){
          TUNE_isTuneable[vco][semitone] = 1;
          TUNE_compuTuneCorrections[vco][semitone] = correction;
        } else {
          setUntunable(vco, semitone);
        }
      } else {
        setUntunable(vco, semitone);
      }
    }
  }
  return updateGlobalTuning(globalTuning);
  
  // TODO: Start matrix
}

void setUntunable(char vco, char semitone){
  MX_vcoTuning[vco][semitone] = 0;
  TUNE_isTuneable[vco][semitone] = 0;
  TUNE_compuTuneCorrections[vco][semitone] = 0;
  TUNE_allAreTuneable = 0;
}