#include "test/munit.h"
#include "test/asserts.h"
#include "Nodetypes.h"
#include "Matrix.internal.h"
#include "Matrix.h"
#include "Definitions.h"


void testBinaryXor(){
    Node aNode;
    //aNode.func = MX_getFunctionPointer(NODE_BINARY_OR);
    aNode.params[0] = 0;
    aNode.params[1] = 0;
    aNode.paramIsConstant = 0b00000111;
    aNode.result = 0;
    //MX_addNode(aNode);

    //should be false if both are 0
    MX_runMatrix();
    assertEquals(BINARY_FALSE,aNode.result,"Binary xor 0 false");

}

// setup and run test suite
void runMatrixTests(){
    reset();
    add(&testBinaryXor);


    run(MX_resetMatrix);
}

// TODO void nodeFuncRamp(Node *aNode){
// TODO void nodeFuncLfoPulse(Node *aNode){