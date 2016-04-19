#ifndef _MATRIX_H
#define _MATRIX_H

#include "Types.h"
#include "Config.h"

// Allthough we only allow a limited number of semitones, it is easier to
// have maps of 127
extern int MX_keyToMatrixMapper[127];
extern int MX_vcoTuning[3][127];

extern volatile Node nodes[MAX_NODES];
extern unsigned short nodesInUse;
extern matrixint MX_nodeResults[INPUTS + MAX_CONSTANTS + MAX_NODES];
extern unsigned short MX_matrixCalculationCompleted;
extern void MX_addNode(unsigned short *bytes);
extern void MX_updateNode(unsigned short *bytes);
extern void MX_addConstant(int constant);
extern void MX_updateConstant(unsigned short *bytes);
extern void MX_setNodeCount(unsigned short *bytes);
extern void MX_setConstantsCount(unsigned short *bytes);
extern void MX_runMatrix();
extern void MX_noteOn(int pitch, int velocity);
extern void MX_noteOff();
extern void MX_command(char* package);
extern void MX_init();
extern void MX_resetTuning();
extern nodeFunction MX_getFunctionPointer(unsigned short function);

#endif