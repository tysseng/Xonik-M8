// maps midi controllers to input positions in the matrix
char MIDI_controllerToInputMap[127];

// configures controller resolution, if set to 1 CC will only be written when
// fine-res arrives.
char MIDI_controllerHiRes[32];