#ifndef _OUTPUT_H
#define _OUTPUT_H
#include "Config.h"
#include "Types.h"

extern matrixint *OUT_outputBuffer;
extern matrixint *OUT_dacBuffer;
void OUT_init();
void OUT_swapBuffers();

#endif