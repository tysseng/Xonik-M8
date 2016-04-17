#ifndef _CONFIG_H
#define _CONFIG_H

#define INPUTS 64 // number of inputs to matrix
// there are two DACs in use, each one has 16 SH circuits connected to it by
// means of a 1-to-16 mux
#define SR_OUTPUTS 16 // shift register outputs
#define OUTPUTS SR_OUTPUTS * 2

#define MAX_NODES 20
#define MAX_CONSTANTS MAX_NODES * 3

// maps midi controllers to input positions in the matrix
extern char MIDI_controllerToInputMap[127];

// configures controller resolution, if set to 1 CC will only be written when
// fine-res arrives.
extern char MIDI_controllerHiRes[32];

#endif