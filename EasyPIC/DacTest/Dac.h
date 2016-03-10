#ifndef DAC_H
#define DAC_H

extern unsigned short DAC_dacUpdatesFinished;
extern unsigned short DAC_intervalMultiplier;

void DAC_init();
void DAC_startTimer();

// for testing purposes only
extern void DAC_step();

#endif