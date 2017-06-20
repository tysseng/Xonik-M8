#include "Types.h"
#include "Config.h"

// buffer that matrix writes output to
matrixint *OUT_matrixBuffer;

// buffer that dac and other outputs reads from. outputs should be moved here by swapping output
// buffers before dac starts writing outputs, to make it possible to write to
// output while simultaneously calculating the next matrix run.
matrixint *OUT_activeBuffer;

// buffers to hold output values, will be mapped to outputBuffer and dacBuffer
matrixint outputBuffer1[OUTPUTS];
matrixint outputBuffer2[OUTPUTS];

// initialize output buffers and set buffer pointers
void OUT_init(){
  unsigned short i;
  OUT_matrixBuffer = &outputBuffer1;
  OUT_activeBuffer    = &outputBuffer2;

  for(i=0; i<OUTPUTS; i++){
    OUT_matrixBuffer[i] = 0;
    OUT_activeBuffer[i] = 0;
  }
}

void OUT_swapBuffers(){
  matrixint *tempOutputBuffer;

  // swap output buffer with dac buffer to make sure nothing
  // changes while updating dacs.
  tempOutputBuffer = OUT_matrixBuffer;
  OUT_matrixBuffer = OUT_activeBuffer;
  OUT_activeBuffer = tempOutputBuffer;
}