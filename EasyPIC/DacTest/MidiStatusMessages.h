#ifndef _MIDI_STATUS_MESSAGES_H
#define _MIDI_STATUS_MESSAGES_H

// Channel voice messages
#define SM_NOTE_OFF 0x80
#define SM_NOTE_ON 0x90
#define SM_POLY_KEY_PRESSURE 0xA0 //AFTERTOUCH
#define SM_CC 0xB0
#define SM_PROGRAM_CHANGE 0xC0
#define SM_CHANNEL_PRESSURE 0xD0 //AFTERTOUCH
#define SM_PITCH_BEND 0xE0

// System common messages
#define SM_SYSEX_START 0xF0
#define SM_MIDI_TIME_CODE_QF 0xF1 // MIDI TIME CODE QUARTER FRAME
#define SM_SONG_POSITION 0xF2
#define SM_SONG_SELECT 0xF3
#define SM_TUNE_REQUEST 0xF6
#define SM_SYSEX_END 0xF7

// System realtime messages - NB: May be interleaved with sysex!
#define SM_TIMING_CLOCK 0xF8
#define SM_START 0xFA
#define SM_CONTINUE 0xFB
#define SM_STOP 0xFC
#define SM_ACTIVE_SENSING 0xFE
#define SM_RESET 0xFF

#endif