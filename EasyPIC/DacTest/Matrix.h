#ifndef _MATRIX_H
#define _MATRIX_H

#include "Types.h"

extern matrixint MX_inputBuffer[8];
extern unsigned short MX_matrixCalculationCompleted;
extern void MX_addNode(Node *aNode);
extern void MX_runMatrix();
extern void MX_resetMatrix();
//nodeFunction MX_getFunctionPointer(unsigned short function);

#endif