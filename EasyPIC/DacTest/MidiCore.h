#ifndef _MIDI_CORE_H
#define _MIDI_CORE_H

// callable midi functions
extern void MIDI_CORE_readFromRxBuffer();
extern void MIDI_CORE_init();

// functions that must be implemented elsewhere
extern void MIDI_HOOK_treatTwoByteMessage(char lastMidiChannel, char lastMidiStatus, char midiByte);
extern void MIDI_HOOK_treatThreeByteMessage(char lastMidiChannel, char lastMidiStatus, char lastMidiParam1, char midiByte);
extern void MIDI_HOOK_treatTuneRequest();
extern void MIDI_HOOK_treatRealtimeStatus(char status);
extern void MIDI_HOOK_treatSysexByte(char midiByte, unsigned int bytePosition);
extern void MIDI_HOOK_sysexAborted();

#endif