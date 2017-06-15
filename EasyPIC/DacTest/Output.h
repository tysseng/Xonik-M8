#ifndef _OUTPUT_H
#define _OUTPUT_H
#include "Config.h"
#include "Types.h"

extern matrixint *OUT_matrixBuffer;
extern matrixint *OUT_activeBuffer;
void OUT_init();
void OUT_swapBuffers();

#endif