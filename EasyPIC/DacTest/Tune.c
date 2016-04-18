#include "Config.h"
#include "Matrix.h"

// TODO: Flash led next to tune pot/button if tuning fails (not all are tuneable)
// TODO: Add tests

// Current global tuning, for recalculation if compu tuning changes.
int globalTuning;

char TUNE_allAreTuneable;
char TUNE_isTuneable[3][127];

// Results from tuning, not including manual global tuning. Will be used
// as the basis for returning next time retune is run or if global tuning 
// changes.
int TUNE_compuTuneCorrections[3][127];

TUNE_init(){
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
  long correction;
  long newPitch;

  char vco;
  char semitone;

  TUNE_allAreTuneable = 1;
  
  for(vco=0; vco<3; vco++){
    for(semitone=CONF_SEMITONE_LOWEST; semitone<=CONF_SEMITONE_HIGHEST; semitone++){
      if(!TUNE_isTuneable[vco][semitone]){
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
char tune(char vco, char semitone){
  return 0;
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
          TUNE_isTuneable[vco][semitone] = 0;
          TUNE_compuTuneCorrections[vco][semitone] = 0;
          TUNE_allAreTuneable = 0;
        }
      }
    }
  }
  return TUNE_updateGlobalTuning(globalTuning);
  
  // TODO: Start matrix
}