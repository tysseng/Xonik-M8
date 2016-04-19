// For all automatically changing functions such as ramps/envelopes and LFOs,
// the value is incremented one every 400uS (16 DAC outputs * 25uS per update).
// This means the sample rate is 2.5kHz

// TODO:
// - Counter node with settable increments
// - Random Node
// - Direct connections from input to output (not via matrix)

#include "Types.h"
#include "Config.h"
#include "Definitions.h"
#include "Nodetypes.h"
#include "Output.h"
#include "Matrix.internal.h"
#include "Matrix.h"
#include "ByteArrayTools.h"
#include "LinToExpTable.h"

// matrix nodes
volatile Node nodes[MAX_NODES];
char nodesInUse = 0;

// maps key (pitch) to matrix 1v/oct representation.
int MX_keyToMatrixMapper[127];

// The sum of compuTune and global tuning
int MX_vcoTuning[3][127];

// TODO: Keep input constant during calculation?

// result of matrix Node calculations for each Node. In addition, input values
// received over spi and input constants are stored as results and must be 
// placed at the start of the results array.
matrixint MX_nodeResults[INPUTS + MAX_CONSTANTS + MAX_NODES];
char constantsInUse = 0;

// true if a matrix run has been completed and data is ready to be copied to
// the dac buffer before the next dac cycle.
unsigned short MX_matrixCalculationCompleted;

// sum an arbitrary number of inputs.
void nodeFuncSum(Node *aNode){
    unsigned short i;
    *aNode->result = 0;
    for(i=0; i<aNode->paramsInUse; i++){
        *aNode->result += *aNode->params[i];
    }
}

// multiply an arbitrary number of inputs.
void nodeFuncMultiply(Node *aNode){
    unsigned short i;
    *aNode->result = *aNode->params[0];
    for(i=1; i<aNode->paramsInUse; i++){
        *aNode->result *= *aNode->params[i];
    }
}

// accepts a single input and inverts it.
void nodeFuncInvert(Node *aNode){
    matrixint param;
    param = *aNode->params[0];

    //hack to allow whole range to be inverted. chops off top as 128 is not
    //possible with an 8 bit signed variable.
    if(param == MAX_NEGATIVE){
        *aNode->result = MAX_POSITIVE;
    } else {
        *aNode->result = -param;
    }
}

// accepts a single input and iverts it around the "center" (64 or -63) of the
// side of 0 that the input is: 1 becomes 127 but -1 becomes -126.
// usefull for inverting envelopes without turning them negative.
void nodeFuncInvertEachSide(Node *aNode){
    matrixint param;
    param = *aNode->params[0];

    if(param >= 0){
        *aNode->result = MAX_POSITIVE - param;
    } else {
        *aNode->result = MAX_NEGATIVE - 1 - param;
    }
}

// calculate increment necessary to get the requested ramp timing.
int calculateRampIncrement(matrixint setting, short direction, short bipolar){
    int highResSetting = setting;
    if(direction == 0){
        highResSetting = -highResSetting;
    }
    return highResSetting << 8;
}

// Ramp function, takes three parameters:
// - param[0]: timing
// - param[1]: trigger, ramp is reset when trigger != 0
// - param[2]: start position (may be runtime input or config), depends on paramIsConstant setting
// - param[3]: bitfield
//   - B0=shoudResetWhenFinished
//   - B1=direction, 0=down, 1=up
//   - B2=bipolar, 0=false (only positive numbers are used), 1=true (full range)
void nodeFuncRamp(Node *aNode){

    int increment;
    matrixint trigger, startPosition;
    bit shouldResetWhenFinished, direction, bipolar;

    trigger = *aNode->params[1];
    startPosition = *aNode->params[2];
    shouldResetWhenFinished = (*aNode->params[3]).B0;

    //TODO: Implement usage of these
    direction = (*aNode->params[3]).B1;
    bipolar = (*aNode->params[3]).B2;

    if(trigger){
        aNode->highResState = startPosition << 8;
        aNode->state.B0 = RUNNING;
    } else {

        // TODO 
        // ERROR
        // ERROR
        // ERROR
        // ERROR
        // ERROR
        // ERROR - makes compilation fail
//        increment = calculateRampIncrement(*aNode->params[0], direction, bipolar);

        //TODO: This may never reach max, is that a problem?
        //      should possibly add max value before resetting
        if(aNode->state.B0){ // RUNNING
            if( direction == UP   && (aNode->highResState < 0 ||  32767 - aNode->highResState > increment) ||
                direction == DOWN && (aNode->highResState > 0 || -32768 - aNode->highResState <= increment)){
                aNode->highResState += increment;
            } else {
                aNode->state.B0 = STOPPED;
                if(shouldResetWhenFinished){
                    aNode->highResState = startPosition << 8;
                }
            }
        }
    }
    *aNode->result = (aNode->highResState >> 8);
}


// A square/pulse wave LFO with settable speed, pulse width, positive and
// negative amplitude, retrigger and start position.

// TODO: Switch to something that is compatible with 96ppqm?
// As the sample rate is 2.5kHz/400uS per sample, the desired period in seconds
// must be multiplied by 2500 to get the correct cycle length.
void nodeFuncLfoPulse(Node *aNode){
    matrixint cyclelength = *aNode->params[0];
    matrixint pulsewidth = *aNode->params[1];
    matrixint trigger = *aNode->params[2];

    //may be set to any value to limit amplitude and save using a scale node.
    matrixint positive = *aNode->params[3];
    matrixint negative = *aNode->params[4];

    bit startPosition;
    startPosition = (*aNode->params[5]).B0; // 0 = bottom, 1 = top;

    if(trigger){
        if(startPosition){
            *aNode->result = positive;
        } else {
            *aNode->result = negative;
        }
        aNode->highResState = 0;
        //TODO: For testing
        aNode->params[2] = 0;
    } else {
        aNode->highResState++;
        if(aNode->highResState == pulsewidth || aNode->highResState == cyclelength){
           //flip
           if(*aNode->result > 0 ){
               *aNode->result = negative;
           } else {
               *aNode->result = positive;
           }
        }
        if(aNode->highResState == cyclelength){
            aNode->highResState = 0;
        }
    }
}

// "delay line", stores the input for one cycle and uses it as feedback in the
// next, makes it possible to make loops in the network (may not be necessary?
// as one can use the value of any Node's previous result in the next run).
//   NB: result should be set to 0 initially (or to whatever starting feedback
//   one wants.
void nodeFuncDelayLine(Node *aNode){
    *aNode->result = *aNode->params[0];
}

// memory with set and clear, may be used as sample and hold
// Set if param 1 > 0,
// Clear if param 2 > 0 (resets to 0)
void nodeFuncMemory(Node *aNode){
    if(*aNode->params[2]){
        *aNode->result = 0;
    } else if(*aNode->params[1]){
        *aNode->result = *aNode->params[0];
    }
}

// switch, passes value on input 0 when input 1 is true, reverts to 0 if not
void nodeFuncSwitch(Node *aNode){
    if(*aNode->params[1]){
        *aNode->result = *aNode->params[0];
    } else {
        *aNode->result = 0;
    }
}

// compares parameter 0 to parameter 1. If 0 is larger, output is BINARY_TRUE,
// if, not it is BINARY_FALSE
void nodeFuncCompare(Node *aNode){
    if(*aNode->params[0] > *aNode->params[1]){
        *aNode->result = BINARY_TRUE;
    } else {
        *aNode->result = BINARY_FALSE;
    }
}

// returns the maximum of all inputs
void nodeFuncMax(Node *aNode){
    unsigned short i;
    matrixint temp;

    *aNode->result = MAX_NEGATIVE;
    for(i = 0; i<aNode->paramsInUse; i++){
        temp = *aNode->params[i];
        if(temp > *aNode->result){
            *aNode->result = temp;
        }
    }
}

// returns the minimum of all inputs
void nodeFuncMin(Node *aNode){
    unsigned short i;
    matrixint temp;

    *aNode->result = MAX_POSITIVE;
    for(i = 0; i<aNode->paramsInUse; i++){
        temp = *aNode->params[i];
        if(temp < *aNode->result){
            *aNode->result = temp;
        }
    }
}

// scales input 0 by input 1 / (MAX_POSITIVE + 1)
void nodeFuncScale(Node *aNode){
    matrixlongint temp;
    matrixint param1, param2;

    param1 = *aNode->params[0];
    param2 = *aNode->params[1];

    // special edge cases
    if(param1 == MAX_POSITIVE && param2 == MAX_POSITIVE){
        //prevents attenuation due to rounding error if both inputs are max positive
        *aNode->result = MAX_POSITIVE;
        return;
    } else if(param1 <= MAX_NEGATIVE+1 && param2 <= MAX_NEGATIVE+1 ){
        //prevents overflow
        *aNode->result = MAX_POSITIVE;
        return;
    }

    temp = param1 * param2;

    //This leads to a slight error - the correct way to do it would be
    //dividing the input by MAX_POSITIVE, but that is an expensive operation.
    //Instead, we shift by 7, which is equal to dividing by MAX_POSITIVE+1.
    temp = temp >> 7;

    *aNode->result = temp;
}

// Generates a pulse (maximum output value) lasting for one iteration
// after the input changes from negative to positive.
void nodeFuncTrigger(Node *aNode){
    if(*aNode->params[0] > 0 ){
        if(aNode->state == 0){
            *aNode->result = MAX_POSITIVE;
            aNode->state = MAX_POSITIVE;
        } else {
            *aNode->result = 0;
        }
    } else {
        aNode->state = 0;
    }
}

// treat input as a binary values and binary AND them
void nodeFuncBinaryAnd(Node *aNode){
    unsigned short paramNum;
    *aNode->result = BINARY_TRUE;
    for(paramNum = 0; paramNum < aNode->paramsInUse; paramNum++){
        if(*aNode->params[paramNum] <= 0){
            *aNode->result = BINARY_FALSE;
            break;
        }
    }
}

// treat input as a binary values and binary OR them
void nodeFuncBinaryOr(Node *aNode){
    unsigned short paramNum;
    *aNode->result = BINARY_FALSE;
    for(paramNum = 0; paramNum < aNode->paramsInUse; paramNum++){
        if(*aNode->params[paramNum] > 0){
            *aNode->result = BINARY_TRUE;
            break;
        }
    }
}

// treat input as a binary values and binary XOR them
void nodeFuncBinaryXor(Node *aNode){
    unsigned short param0;
    unsigned short param1;

    param0 = *aNode->params[0] > 0;
    param1 = *aNode->params[1] > 0;

    if(param0 != param1){
      *aNode->result = BINARY_TRUE;
    } else {
      *aNode->result = BINARY_FALSE;
    }
}

// treat input as a binary value and binary INVERT it
void nodeFuncBinaryNot(Node *aNode){
    if(*aNode->params[0] > 0){
        *aNode->result = BINARY_FALSE;
    } else {
        *aNode->result = BINARY_TRUE;
    }
}

// fetch an input from the corresponding position in the Node results. This
// buffers the input in case the input changes during the matrix calculation and 
// can be used to get a constant value for all later nodes if that is important.
void nodeFuncBufferInput(Node *aNode){
    *aNode->result = MX_nodeResults[*aNode->params[0]];
}

// write output to outputBuffer
// Param 0: output buffer position
// Param 1: index of Node to fetch result from
void nodeFuncOutput(Node *aNode){
  OUT_outputBuffer[*aNode->params[0]] = *aNode->params[1];
}

// Convert linear value to exponential. Only positive values are converted,
// all others are 0, to allow maximum offness.
void nodeFuncPositiveExp(Node *aNode){
  matrixint input = *aNode->params[0];

  if(input >= 0){
    // the real value is heavily rounded off to save space in the lookup
    // table.
    *aNode->result = linToExp[input >> 3];
  } else {
    *aNode->result = 0;
  }
}

// write output to outputBuffer and correct for vco tuning.
// Param 0: output buffer position
// Param 1: index of Node to fetch result from
void nodeFuncOutputTuned(Node *aNode){
  char vco = *aNode->params[0]; // must be 0,1,2
  matrixint value = *aNode->params[1];
  
  // convert value to 7 bit (between -64 and +63)
  int tuneIndex = 64 + (value >> 9);

  // TODO: Check if in range?
  OUT_outputBuffer[vco] = value + MX_vcoTuning[vco][tuneIndex];
}

//glide any output. resists change.
void nodeFuncGlide(Node *aNode){
    matrixint input = *aNode->params[0];
    matrixint maxchange = *aNode->params[1]; // maximum rate of change - consider inverting this to get 0=no glide, max = max glide.
    matrixint glideUp   = *aNode->params[2]; // should glide up?
    matrixint glideDown = *aNode->params[3]; // should glide down?
    
    matrixint change = input - *aNode->result;
    if(change > 0 && glideUp){ // input is larger than current output
        if(change > maxchange){
            *aNode->result += maxchange;
        } else {
            *aNode->result += change;
        }
    } else if(change < 0 && glideDown) { // input is smaller than current output
        if(change < maxchange * -1){
            *aNode->result -= maxchange;
        } else {
            *aNode->result += change;
        }
    } else {
        *aNode->result = input;
    }
}

void nodeFuncQuantize(Node *aNode){
     //TODO
}

// do nothing
void nodeFuncNoop(Node *aNode){}

void MX_addConstant(int constant){
  // constant nodes are not included as real nodes in the matrix for memory
  // reasons, as they contain no input or function, only the result value which
  // never changes. Instead, they are placed first in the separate results
  // array.
  MX_nodeResults[INPUTS + constantsInUse++] = constant;
}

void MX_updateConstant(unsigned short *bytes){
  MX_nodeResults[bytes[CONST_POSITION]] = BAT_getAsInt(bytes, CONST_VALUE_HI);
}

void MX_addNode(unsigned short *bytes){

  // the Node as sent from the master is numbered as if constants are also
  // stored as real nodes, when in fact they are stored only as results in the
  // results array. To compensate for this, we update the Node position by
  // subtracting the number of constants in use.
  unsigned short resultPosition = nodesInUse + constantsInUse + INPUTS;
  unsigned short position = nodesInUse;
  unsigned short i;
  
  nodes[position].func = MX_getFunctionPointer(bytes[NODE_FUNC]);
  for(i=0; i<8; i++){
    nodes[position].params[i] = &MX_nodeResults[BAT_getAsUInt(bytes, i*2 + NODE_PARAM_0_HI)];
  }
  nodes[position].paramsInUse = bytes[NODE_PARAMS_IN_USE];
  
  MX_nodeResults[resultPosition] = BAT_getAsInt(bytes, NODE_RESULT_HI);
  nodes[position].result = &MX_nodeResults[resultPosition];
  nodesInUse++;
}

void MX_updateNode(unsigned short *bytes){

  // the Node as sent from the master is numbered as if constants are also
  // stored as real nodes, when in fact they are stored only as results in the
  // results array. To compensate for this, we update the Node position by
  // subtracting the number of constants in use.
  unsigned int resultPosition = BAT_getAsUInt(bytes, NODE_POSITION_HI);
  unsigned int position = resultPosition - constantsInUse - INPUTS;
  unsigned short i;

  nodes[position].func = MX_getFunctionPointer(bytes[NODE_FUNC]);
  for(i=0; i<8; i++){
    nodes[position].params[i] = &MX_nodeResults[BAT_getAsUInt(bytes, i*2 + NODE_PARAM_0_HI)];
  }
  nodes[position].paramsInUse = bytes[NODE_PARAMS_IN_USE];
  
  MX_nodeResults[resultPosition] = BAT_getAsInt(bytes, NODE_RESULT_HI);
  nodes[position].result = &MX_nodeResults[position + constantsInUse];
}
    
void MX_setNodeCount(unsigned short *bytes){
  nodesInUse = BAT_getAsUInt(bytes, NODES_COUNT_HI);
}

void MX_setConstantsCount(unsigned short *bytes){
  constantsInUse = BAT_getAsUInt(bytes, CONSTS_COUNT_HI);
}

void MX_noteOn(int pitch, int velocity){
  MX_nodeResults[MATRIX_INPUT_PITCH] = MX_keyToMatrixMapper[pitch];
  MX_nodeResults[MATRIX_INPUT_VELOCITY] = velocity << 8;
  MX_nodeResults[MATRIX_INPUT_GATE] = 0x7FFF;
}

void MX_noteOff(){
  MX_nodeResults[MATRIX_INPUT_VELOCITY] = 0;
  MX_nodeResults[MATRIX_INPUT_GATE] = 0;
}

// loop over the matrix array once and calculate all results
void MX_runMatrix(){
  unsigned short i;
  
  for(i = 0; i<nodesInUse; i++){
    nodes[i].func(&nodes[i]);
  }

  // all nodes have written their data to the output buffer, tell
  // dac loop that new data can be loaded when dac cycle restarts
  MX_matrixCalculationCompleted = 1;
}

void MX_command(char* package){
  // Start, stop matrix, possibly in conjunction with an interrupt
  
  // TODO: Turn down output volume on stop, requires knowledge of
}

void resetMatrix(){
  char i;
  
  nodesInUse = 0;
  constantsInUse = 0;

  for(i=0; i<INPUTS + MAX_CONSTANTS + MAX_NODES; i++){
    MX_nodeResults[i] = 0;
  }
}

void MX_resetTuning(){
  char semitone;
  char vco;

  for(vco=0; vco<3; vco++){
    for(semitone=0; semitone<127; semitone++){
      MX_vcoTuning[vco][semitone] = 0;
    }
  }
}

void initKeyToMatrixValue(){

  // With 1V/oct: max range = -5 to +5V = 10 octaves = 120 semitones.
  // Midi represents a maximum of 128 semitones.

  // We'll choose C4 as midi key number 60, this gives 21 = A0 and 108 = C8.
  // We'll place C4 at 0V.

  // To represent 1/12V: 32768 / 60 = 546,1333...

  // TODO: Change so that we can represent 108 semitones (9 octaves) - 5 +/- 2
  // leaving 19 semitones for tuning.

  char i;

  long semitone = 32768000 / 60;

  for(i = 0; i < 121; i++){
    MX_keyToMatrixMapper[i] = ((i - 60) * semitone) / 1000;
  }

  // we are not able to represent 121 to 127 correctly but must
  // at least make sure nothing breaks if the values are received.
  for(i=121; i<127; i++){
    MX_keyToMatrixMapper[i] = MX_keyToMatrixMapper[120];
  }
}

nodeFunction MX_getFunctionPointer(unsigned short function){

    switch(function){
        case NODE_SUM:
            return &nodeFuncSum;
        case NODE_INVERT:
            return &nodeFuncInvert;
        case NODE_INVERT_EACH_SIDE:
            return &nodeFuncInvertEachSide;
        case NODE_RAMP:
            return &nodeFuncRamp;
        case NODE_DELAY_LINE:
            return &nodeFuncDelayLine;
        case NODE_MULTIPLY:
            return &nodeFuncMultiply;
        case NODE_MEMORY:
            return &nodeFuncMemory;
        case NODE_LFO_PULSE:
            return &nodeFuncLfoPulse;
        case NODE_SWITCH:
            return &nodeFuncSwitch;
        case NODE_COMPARE:
            return &nodeFuncCompare;
        case NODE_MAX:
            return &nodeFuncMax;
        case NODE_MIN:
            return &nodeFuncMin;
        case NODE_SCALE:
            return &nodeFuncScale;
        case NODE_TRIGGER:
            return &nodeFuncTrigger;
        case NODE_BINARY_AND:
            return &nodeFuncBinaryAnd;
        case NODE_BINARY_OR:
            return &nodeFuncBinaryOr;
        case NODE_BINARY_XOR:
            return &nodeFuncBinaryXor;
        case NODE_BINARY_NOT:
            return &nodeFuncBinaryNot;
        case NODE_BUFFER_INPUT:
            return &nodeFuncBufferInput;
        case NODE_OUTPUT:
            return &nodeFuncOutput;
        case NODE_OUTPUT_TUNED:
            return &nodeFuncOutputTuned;
        case NODE_GLIDE:
            return &nodeFuncGlide;
        case NODE_QUANTIZE:
            return &nodeFuncNoop;
        case NODE_TUNE:
            return &nodeFuncNoop;
        case NODE_POSITIVE_EXP:
            return &nodeFuncPositiveExp;
        default:
            return &nodeFuncNoop;
    }
}

void MX_init(){
  char i;

  initKeyToMatrixValue();
  resetMatrix();
}