#ifndef DAC_H
#define DAC_H

extern unsigned short DAC_dacUpdatesFinished;
extern unsigned short DAC_intervalMultiplier;

void DAC_fillOutputs(unsigned int value);
void DAC_init();
void DAC_startTimer();

#endif