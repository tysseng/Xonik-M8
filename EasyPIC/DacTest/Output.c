#include "Types.h"
#include "Config.h"

// buffer that matrix writes output to
matrixint *OUT_outputBuffer;

// buffer that dac reads from. outputs should be moved here by swapping output
// buffers before dac starts writing outputs, to make it possible to write to
// output while simultaneously calculating the next matrix run.
matrixint *OUT_dacBuffer;

// buffers to hold output values, will be mapped to outputBuffer and dacBuffer
matrixint outputBuffer1[OUTPUTS];
matrixint outputBuffer2[OUTPUTS];

// initialize output buffers and set buffer pointers
void OUT_init(){
    unsigned short i;
    OUT_outputBuffer = &outputBuffer1;
    OUT_dacBuffer    = &outputBuffer2;

    for(i=0; i<OUTPUTS; i++){
        OUT_outputBuffer[i] = 0;
        OUT_dacBuffer[i]    = 0;
    }
}

void OUT_swapBuffers(){
    matrixint *tempOutputBuffer;

    // swap output buffer with dac buffer to make sure nothing
    // changes while updating dacs.
    tempOutputBuffer = OUT_outputBuffer;
    OUT_outputBuffer = OUT_dacBuffer;
    OUT_dacBuffer = tempOutputBuffer;
}