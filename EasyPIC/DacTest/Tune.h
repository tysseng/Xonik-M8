#ifndef _TUNE_H
#define _TUNE_H

extern char TUNE_allAreTuneable;
extern char TUNE_isTuneable[3][127];
extern int TUNE_compuTuneCorrections[3][127];

void TUNE_init();
char TUNE_updateGlobalTuning(int updatedGlobalTuning);
char TUNE_retune();
#endif