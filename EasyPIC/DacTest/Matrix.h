#ifndef _MATRIX_H
#define _MATRIX_H

#include "Types.h"
#include "Config.h"

extern volatile Node nodes[MAX_OPERATIONS];
extern unsigned short nodesInUse;
extern matrixint MX_inputBuffer[INPUTS];
extern unsigned short MX_matrixCalculationCompleted;
extern void MX_addNode(unsigned short *bytes);
extern void MX_runMatrix();
extern void MX_resetMatrix();
extern nodeFunction MX_getFunctionPointer(unsigned short function);

#endif