#ifndef _MIDI_CORE_INTERNAL_H
#define _MIDI_CORE_INTERNAL_H

extern void writeToRxBuffer(char input);
extern void writeToRxBuffer_Test(char input);
extern void treatMidiByte(char midiByte);
extern void treatStatusByte(char midiByte);
extern void treatSysexStatusByte(char midiByte);
extern void treatRealtimeStatus(char midiByte);
extern void treatDataByte(char midiByte);
extern void treatSysexDataByte(char midiByte);
extern void treatSysexByte(char midiByte);
extern void setupRxBuffer();
extern void setupInterrupts();
extern void setupUsart();
extern void setupActiveMidiChannels();
extern void flashStatus(char times);

#endif