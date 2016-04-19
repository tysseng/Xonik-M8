#include "test/munit.h"
#include "test/asserts.h"
#include "nodetypes.h"
#include "matrix.internal.h"
#include "matrix.h"
#include "output.h"
#include "definitions.h"


void resetMatrixTests(){
  resetMatrix();
  MX_resetTuning();
  OUT_init();

}

/*
void testSum(){
    Node aNode;
    aNode.func = MX_getFunctionPointer(NODE_SUM);
    aNode.params[0] = 1;
    aNode.params[1] = 2;
    aNode.params[2] = 4;
    aNode.paramsInUse = 3;
    aNode.paramIsConstant = 0b00000111;
    MX_addNode(&aNode);
    
    MX_runMatrix();
    
    assertEquals(7,aNode.result,"sum");
}

void testMultiply(){
    Node aNode;
    aNode.func = MX_getFunctionPointer(NODE_MULTIPLY);
    aNode.params[0] = 2;
    aNode.params[1] = 4;
    aNode.params[2] = 8;
    aNode.paramsInUse = 3;
    aNode.paramIsConstant = 0b00000111;
    MX_addNode(&aNode);
    
    MX_runMatrix();

    assertEquals(64,aNode.result,"product");
}

void testInvertPositive(){
    Node aNode;
    aNode.func = MX_getFunctionPointer(NODE_INVERT);
    aNode.params[0] = 10;
    aNode.paramIsConstant = 0b00000001;
    MX_addNode(&aNode);

    MX_runMatrix();

    assertEquals(-10,aNode.result,"invert positive");
}

void testInvertNegative(){
    Node aNode;
    aNode.func = MX_getFunctionPointer(NODE_INVERT);
    aNode.params[0] = -10;
    aNode.paramIsConstant = 0b00000001;
    MX_addNode(&aNode);

    MX_runMatrix();

    assertEquals(10,aNode.result,"invert negative");
}

// special case as max positive is 1 less than max negative
void testInvertMaxNegative(){
    Node aNode;
    aNode.func = MX_getFunctionPointer(NODE_INVERT);
    aNode.params[0] = MAX_NEGATIVE;
    aNode.paramIsConstant = 0b00000001;
    MX_addNode(&aNode);

    MX_runMatrix();

    assertEquals(MAX_POSITIVE,aNode.result,"invert max negative");
}

void testInvertZero(){
    Node aNode;
    aNode.func = MX_getFunctionPointer(NODE_INVERT);
    aNode.params[0] = 0;
    aNode.paramIsConstant = 0b00000001;
    MX_addNode(&aNode);

    MX_runMatrix();

    assertEquals(0,aNode.result,"invert zero");
}

void testInvertEachSideZero(){
    Node aNode;
    aNode.func = MX_getFunctionPointer(NODE_INVERT_EACH_SIDE);
    aNode.params[0] = 0;
    aNode.paramIsConstant = 0b00000001;
    MX_addNode(&aNode);

    MX_runMatrix();

    assertEquals(MAX_POSITIVE,aNode.result,"invert each side zero");
}

void testInvertEachSidePositive(){
    Node aNode;
    aNode.func = MX_getFunctionPointer(NODE_INVERT_EACH_SIDE);
    aNode.params[0] = MAX_POSITIVE;
    aNode.paramIsConstant = 0b00000001;
    MX_addNode(&aNode);

    MX_runMatrix();

    assertEquals(0,aNode.result,"invert each side positive");
}

void testInvertEachSideNegative(){
    Node aNode;
    aNode.func = MX_getFunctionPointer(NODE_INVERT_EACH_SIDE);
    aNode.params[0] = MAX_NEGATIVE;
    aNode.paramIsConstant = 0b00000001;
    MX_addNode(&aNode);

    MX_runMatrix();

    assertEquals(-1,aNode.result,"invert each side negative");
}

void testDelayLine(){
    Node aNode;
    aNode.func = MX_getFunctionPointer(NODE_DELAY_LINE);
    aNode.params[0] = 10;
    aNode.paramIsConstant = 0b00000001;
    aNode.result = 0;
    MX_addNode(&aNode);

    assertEquals(0,aNode.result,"delay line precondition");
    
    MX_runMatrix();

    assertEquals(10,aNode.result,"delay line");
}

void testMemorySet(){
    Node aNode;
    aNode.func = MX_getFunctionPointer(NODE_MEMORY);
    aNode.params[0] = 10;
    aNode.params[1] = 1; // should set
    aNode.params[2] = 0; // should not clear
    aNode.paramIsConstant = 0b00000111;
    MX_addNode(&aNode);

    MX_runMatrix();

    assertEquals(10,aNode.result,"memory set");
}

void testMemoryHold(){
    Node aNode;
    aNode.func = MX_getFunctionPointer(NODE_MEMORY);
    aNode.result = 5; //value to hold - leave unchanged
    aNode.params[0] = 10;
    aNode.params[1] = 0; // should not set
    aNode.params[2] = 0; // should not clear
    aNode.paramIsConstant = 0b00000111;
    MX_addNode(&aNode);

    MX_runMatrix();

    assertEquals(5,aNode.result,"memory hold");
}

void testMemoryClear(){
    Node aNode;
    aNode.func = MX_getFunctionPointer(NODE_MEMORY);
    aNode.result = 7; //initial value
    aNode.params[0] = 10;
    aNode.params[1] = 0; // should not set
    aNode.params[2] = 1; // should clear
    aNode.paramIsConstant = 0b00000111;
    MX_addNode(&aNode);

    MX_runMatrix();

    assertEquals(0,aNode.result,"memory hold");
}

void testLfoPulse(){
    Node aNode;
    aNode.func = MX_getFunctionPointer(NODE_LFO_PULSE);
    aNode.params[0] = 3; // cycle width = 3
    aNode.params[1] = 2; // pulse width = 2
    aNode.params[2] = 1; // trigger pulse start (not necessary though)
    aNode.params[3] = 10; // max positive
    aNode.params[4] = -5; // max negative
    aNode.params[5] = 0b00000001; // start on top
    aNode.paramIsConstant = 0b00111111;
    aNode.result = 0;
    MX_addNode(&aNode);

    MX_runMatrix(); // on the first run, trigger should cause the output to go high and reset the iteration counter

    assertEquals(10,aNode.result,"LFO Pulse trigger");
    assertEquals(0,aNode.highResState,"LFO Pulse init iterator");
    
    aNode.params[2] = 0; // remove trigger

    MX_runMatrix();

    // after one cycle, nothing should have changed except the counter
    assertEquals(10,aNode.result,"LFO Pulse step 2");
    assertEquals(1,aNode.highResState,"LFO Pulse iterator increment");

    MX_runMatrix();
    
    // after two cycles we should have reached the pulse length and the lfo should drop to its minimum value
    assertEquals(-5,aNode.result,"LFO Pulse step 3");

    MX_runMatrix();

    // after three cycles, we should be back to start:
    assertEquals(10,aNode.result,"LFO Pulse step 4");
    assertEquals(0,aNode.highResState,"LFO Pulse iterator reset");

}

void testLfoPulseRetrigger(){
    Node aNode;
    aNode.func = MX_getFunctionPointer(NODE_LFO_PULSE);
    aNode.params[0] = 3; // cycle width = 3
    aNode.params[1] = 2; // pulse width = 2
    aNode.params[2] = 1; // trigger pulse start (not necessary though)
    aNode.params[3] = 10; // max positive
    aNode.params[4] = -5; // max negative
    aNode.params[5] = 0b00000001; // start on top
    aNode.paramIsConstant = 0b00111111;
    aNode.result = 0;
    MX_addNode(&aNode);

    MX_runMatrix();

    // on the first run, trigger should cause the output to go high and reset 
    // the iteration counter
    assertEquals(10,aNode.result,"LFO Pulse trigger");
    assertEquals(0,aNode.highResState,"LFO Pulse init iterator");

    MX_runMatrix();

    // running again with the trigger high should reset state
    assertEquals(10,aNode.result,"LFO Pulse retrigger");
    assertEquals(0,aNode.highResState,"LFO Pulse reset iterator");
}

void testLfoPulseStartOnBottom(){
    Node aNode;
    aNode.func = MX_getFunctionPointer(NODE_LFO_PULSE);
    aNode.params[0] = 3; // cycle width = 3
    aNode.params[1] = 2; // pulse width = 2
    aNode.params[2] = 1; // trigger pulse start (not necessary though)
    aNode.params[3] = 10; // max positive
    aNode.params[4] = -5; // max negative
    aNode.params[5] = 0b00000000; // start on bottom
    aNode.paramIsConstant = 0b00111111;
    aNode.result = 0;
    MX_addNode(&aNode);

    MX_runMatrix();

    // on the first run, trigger should cause the output to go low
    assertEquals(-5,aNode.result,"LFO Pulse start low");
}

void testSwitch(){

    Node aNode;
    aNode.func = MX_getFunctionPointer(NODE_SWITCH);
    aNode.params[0] = 10; // input
    aNode.params[1] = 0; // switch is initially off
    aNode.paramIsConstant = 0b00000011;
    aNode.result = 0;
    MX_addNode(&aNode);

    MX_runMatrix();

    // switch is off so output should be 0
    assertEquals(0,aNode.result,"Switch off");

    //turn on switch
    aNode.params[1] = 1;
    MX_runMatrix();

    // switch is on so output should be equal to input
    assertEquals(10,aNode.result,"Switch on");

    //turn off switch
    aNode.params[1] = 0;
    MX_runMatrix();

    // switch is off so output should revert to 0
    assertEquals(0,aNode.result,"Switch off again");
}

void testCompare(){

    Node aNode;
    aNode.func = MX_getFunctionPointer(NODE_COMPARE);
    aNode.params[0] = 10; // input 0 is larger than input 1
    aNode.params[1] = -10;
    aNode.paramIsConstant = 0b00000011;
    aNode.result = 0;
    MX_addNode(&aNode);

    MX_runMatrix();
    assertEquals(BINARY_TRUE,aNode.result,"Compare true");

    aNode.params[0] = -10; // input 0 is smaller than input 1
    aNode.params[1] = 10;

    MX_runMatrix();
    assertEquals(BINARY_FALSE,aNode.result,"Compare false");

    aNode.params[0] = 10; // inputs are equal
    aNode.params[1] = 10;

    MX_runMatrix();
    assertEquals(BINARY_FALSE,aNode.result,"Compare false");
}

void testMax(){

    Node aNode;
    aNode.func = MX_getFunctionPointer(NODE_MAX);
    aNode.params[0] = -5;
    aNode.params[1] = 7;
    aNode.params[1] = 0;
    aNode.paramIsConstant = 0b00000111;
    aNode.result = 0;
    MX_addNode(&aNode);

    MX_runMatrix();
    assertEquals(7,aNode.result,"Max");
}

void testMin(){

    Node aNode;
    aNode.func = MX_getFunctionPointer(NODE_MIN);
    aNode.params[0] = -5;
    aNode.params[1] = 7;
    aNode.params[1] = 0;
    aNode.paramIsConstant = 0b00000111;
    aNode.result = 0;
    MX_addNode(&aNode);

    MX_runMatrix();
    assertEquals(-5,aNode.result,"Min");
}

void testScale(){

    Node aNode;
    aNode.func = MX_getFunctionPointer(NODE_SCALE);
    aNode.paramIsConstant = 0b00000111;
    aNode.result = 0;
    MX_addNode(&aNode);

    // Full scale, no reduction
    aNode.params[0] = MAX_POSITIVE;
    aNode.params[1] = MAX_POSITIVE;

    MX_runMatrix();
    assertEquals(MAX_POSITIVE,aNode.result,"Scale max positive");
    
    // Full scale, no reduction
    aNode.params[0] = MAX_POSITIVE;
    aNode.params[1] = MAX_POSITIVE - 1;

    MX_runMatrix();
    assertEquals(MAX_POSITIVE-2,aNode.result,"Scale almost max positive"); //-2 since we get a rounding error.

    // scaling by zero should always be zero
    aNode.params[0] = MAX_POSITIVE;
    aNode.params[1] = 0;

    MX_runMatrix();
    assertEquals(0,aNode.result,"Scale zero");

    aNode.params[0] = 0;
    aNode.params[1] = 0;

    MX_runMatrix();
    assertEquals(0,aNode.result,"Scale two zero");

    // scaling by a negative number should be negative
    aNode.params[0] = MAX_POSITIVE;
    aNode.params[1] = -1;

    MX_runMatrix();
    assertEquals(-1,aNode.result,"Scale minus 1");
    
    // edge cases for multiplying maximum values - will not reach max negative
    // as the positive scale factor is less than the negative.
    aNode.params[0] = MAX_NEGATIVE;
    aNode.params[1] = MAX_POSITIVE;

    MX_runMatrix();
    assertEquals(MAX_NEGATIVE+1,aNode.result,"Scale max negative");

    //Edge case, as it is possible to get more negative than positive
    aNode.params[0] = MAX_NEGATIVE;
    aNode.params[1] = MAX_NEGATIVE;

    MX_runMatrix();
    assertEquals(MAX_POSITIVE,aNode.result,"Scale max negative");

    //Edge case, as it is possible to get more negative than positive
    aNode.params[0] = MAX_NEGATIVE+1;
    aNode.params[1] = MAX_NEGATIVE;

    MX_runMatrix();
    assertEquals(MAX_POSITIVE,aNode.result,"Scale max negative on param0");

    //Edge case, as it is possible to get more negative than positive
    aNode.params[0] = MAX_NEGATIVE;
    aNode.params[1] = MAX_NEGATIVE+1;

    MX_runMatrix();
    assertEquals(MAX_POSITIVE,aNode.result,"Scale max negative on param1");

    //Normal cases, positive
    aNode.params[0] = 64;
    aNode.params[1] = 64;

    MX_runMatrix();
    assertEquals(32,aNode.result,"Scale normal");

    //Normal cases, negative
    aNode.params[0] = -64;
    aNode.params[1] = -64;

    MX_runMatrix();
    assertEquals(32,aNode.result,"Scale normal negative");

    //Normal cases, mixed
    aNode.params[0] = -64;
    aNode.params[1] = 64;

    MX_runMatrix();
    assertEquals(-32,aNode.result,"Scale normal mixed");
}

void testTrigger(){

    Node aNode;
    aNode.func = MX_getFunctionPointer(NODE_TRIGGER);
    aNode.params[0] = 1; //trigger input
    aNode.paramIsConstant = 0b00000001;
    aNode.result = 0;
    MX_addNode(&aNode);

    //output should trigger on first high input
    MX_runMatrix();
    assertEquals(MAX_POSITIVE,aNode.result,"Trigger high");

    //output should go low after one cycle
    MX_runMatrix();
    assertEquals(0, aNode.result,"Trigger low");

    //output should go stay low when input is removed
    aNode.params[0] = 0; //trigger input removed
    MX_runMatrix();
    assertEquals(0, aNode.result,"Trigger stays low");

    //output should retrigger if input goes high again
    aNode.params[0] = 1; //trigger input removed
    MX_runMatrix();
    assertEquals(MAX_POSITIVE, aNode.result,"Trigger retrigger");
}

void testBinaryAnd(){
    Node aNode;
    aNode.func = MX_getFunctionPointer(NODE_BINARY_AND);
    aNode.params[0] = 1;
    aNode.params[1] = 1;
    aNode.params[2] = 0;
    aNode.paramIsConstant = 0b00000111;
    aNode.result = 0;
    MX_addNode(&aNode);

    //should be false if at least one is false
    MX_runMatrix();
    assertEquals(BINARY_FALSE,aNode.result,"Binary and false");

    //should be true if all are true
    MX_runMatrix();
    aNode.params[2] = 1;
    assertEquals(BINARY_TRUE,aNode.result,"Binary and true");
}

void testBinaryOr(){
    Node aNode;
    aNode.func = MX_getFunctionPointer(NODE_BINARY_OR);
    aNode.params[0] = 0;
    aNode.params[1] = 1;
    aNode.params[2] = 0;
    aNode.paramIsConstant = 0b00000111;
    aNode.result = 0;
    MX_addNode(&aNode);

    //should be true if at least one is true
    MX_runMatrix();
    assertEquals(BINARY_TRUE,aNode.result,"Binary or true");

    //should be false if all are false
    MX_runMatrix();
    aNode.params[1] = 0;
    assertEquals(BINARY_FALSE,aNode.result,"Binary or false");
}

void testBinaryXor(){
    Node aNode;
    aNode.func = MX_getFunctionPointer(NODE_BINARY_OR);
    aNode.params[0] = 0;
    aNode.params[1] = 0;
    aNode.paramIsConstant = 0b00000111;
    aNode.result = 0;
    MX_addNode(&aNode);

    //should be false if both are 0
    MX_runMatrix();
    assertEquals(BINARY_FALSE,aNode.result,"Binary xor 0 false");
}
*/

void addOutputTunedNode(int pitch){
  char aNode[21];

  MX_nodeResults[0] = 0;
  MX_nodeResults[1] = pitch;

  aNode[NODE_FUNC] = NODE_OUTPUT_TUNED;

  // output position
  aNode[NODE_PARAM_0_LO] = 0;
  aNode[NODE_PARAM_0_HI] = 0;

  // pitch
  aNode[NODE_PARAM_1_LO] = 1;
  aNode[NODE_PARAM_1_HI] = 0;
  aNode[NODE_PARAMS_IN_USE] = 2;
  MX_addNode(aNode);
}

void testOutputTunedOnSemitone(){
  // real pitch value, pitch exactly C4
  addOutputTunedNode(0);

  // add tuning offset
  MX_vcoTuning[0][64] = 100;

  MX_runMatrix();

  assertEquals(100, OUT_outputBuffer[0], "Pitch not corrected");
}

void testOutputTunedPitchRoundingLower(){

  // real pitch value - should give an index of 0
  addOutputTunedNode(-32768);

  // add tuning offset - this position should not have a value in real life
  // as we do not tune the lowest and highest tones, but it is ok for testing
  MX_vcoTuning[0][0] = 100;

  MX_runMatrix();

  assertEquals(-32668, OUT_outputBuffer[0], "Pitch not corrected");
}

void testOutputTunedPitchRoundingHigher(){

  // real pitch value - should give an index of 127
  addOutputTunedNode(32767);

  // add tuning offset - this position should not have a value in real life
  // as we do not tune the lowest and highest tones, but it is ok for testing
  MX_vcoTuning[0][127] = -100;

  MX_runMatrix();

  assertEquals(32667, OUT_outputBuffer[0], "Pitch not corrected");
}

void testOutputTunedPitchRounding(){

  // real pitch value - should give an index of 87
  addOutputTunedNode(12224);

  MX_vcoTuning[0][87] = -100;

  MX_runMatrix();

  assertEquals(12124, OUT_outputBuffer[0], "Pitch not corrected");
}

void testPositiveExpPositiveEdge(){
  char aNode[21];

  MX_nodeResults[0] = 32767;

  aNode[NODE_FUNC] = NODE_POSITIVE_EXP;

  // input
  aNode[NODE_PARAM_0_LO] = 0;
  aNode[NODE_PARAM_0_HI] = 0;

  MX_addNode(aNode);

  MX_runMatrix();
  
  assertEquals(32767, MX_nodeResults[64], "Wrong edge conversion");
}

void testPositiveExpPositive(){
  char aNode[21];

  MX_nodeResults[0] = 26900;

  aNode[NODE_FUNC] = NODE_POSITIVE_EXP;

  // input
  aNode[NODE_PARAM_0_LO] = 0;
  aNode[NODE_PARAM_0_HI] = 0;

  MX_addNode(aNode);
  
  MX_runMatrix();

  assertEquals(400, MX_nodeResults[64], "Wrong positive conversion");
}

void testPositiveExpNegative(){
  char aNode[21];

  MX_nodeResults[0] = -100;

  aNode[NODE_FUNC] = NODE_POSITIVE_EXP;

  // input
  aNode[NODE_PARAM_0_LO] = 0;
  aNode[NODE_PARAM_0_HI] = 0;

  MX_addNode(aNode);
  
  MX_runMatrix();

  assertEquals(0, MX_nodeResults[64], "Wrong negative conversion");
}

// setup and run test suite
void runMatrixTests(){
    resetTests();
    add(&testOutputTunedOnSemitone);
    add(&testOutputTunedPitchRoundingLower);
    add(&testOutputTunedPitchRoundingHigher);
    add(&testOutputTunedPitchRounding);
    
    add(&testPositiveExpPositiveEdge);
    add(&testPositiveExpPositive);
    add(&testPositiveExpNegative);
    
    //TODO: Add exp conv tests
    
    /*
    add(&testSum);
    add(&testMultiply);
    
    add(&testInvertPositive);
    add(&testInvertNegative);
    add(&testInvertMaxNegative);
    add(&testInvertZero);

    add(&testInvertEachSideZero);
    add(&testInvertEachSidePositive);
    add(&testInvertEachSideNegative);
    
    add(&testDelayLine);

    add(&testMemorySet);
    add(&testMemoryHold);
    add(&testMemoryClear);
    
    add(&testLfoPulse);
    add(&testLfoPulseRetrigger);
    add(&testLfoPulseStartOnBottom);
    add(&testSwitch);
    add(&testCompare);
    add(&testMax);
    add(&testMin);
    add(&testScale);
    add(&testTrigger);
    add(&testBinaryAnd);
    add(&testBinaryOr);
*/
    
    run(resetMatrixTests);
}

// TODO void nodeFuncRamp(Node *aNode){
// TODO void nodeFuncLfoPulse(Node *aNode){