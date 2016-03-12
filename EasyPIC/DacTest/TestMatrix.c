#include "Matrix.h"
#include "Nodetypes.h"
#include "Types.h"

void TM_setupTestMatrix(){
    char aNode0[21], aNode1[21], aNode2[21], aNode3[21];

    MX_addConstant(0);
    MX_addConstant(1);
    MX_addConstant(4);
    MX_addConstant(1);
    MX_addConstant(1);
    MX_addConstant(0x7D00);
    MX_addConstant(0x8300);
    MX_addConstant(2);

    aNode1[NODE_FUNC] = NODE_OUTPUT;
    // output position
    aNode1[NODE_PARAM_0_LO] = 1;
    aNode1[NODE_PARAM_0_HI] = 0;
    // Node to get output from
    aNode1[NODE_PARAM_1_LO] = 0; // = input 0
    aNode1[NODE_PARAM_1_HI] = 0;
    MX_addNode(aNode1);

    aNode2[NODE_FUNC] = NODE_LFO_PULSE;
    // cycle length
    aNode2[NODE_PARAM_0_LO] = 2 + INPUTS;
    aNode2[NODE_PARAM_0_HI] = 0;
    // pulse width
    aNode2[NODE_PARAM_1_LO] = 3 + INPUTS;
    aNode2[NODE_PARAM_1_HI] = 0;
    // trigger
    aNode2[NODE_PARAM_2_LO] = 4 + INPUTS;
    aNode2[NODE_PARAM_2_HI] = 0;
    // positive
    aNode2[NODE_PARAM_3_LO] = 5 + INPUTS;
    aNode2[NODE_PARAM_3_HI] = 0;
    // negative
    aNode2[NODE_PARAM_4_LO] = 6 + INPUTS;
    aNode2[NODE_PARAM_4_HI] = 0;
    aNode2[NODE_PARAM_5_LO] = 0;
    aNode2[NODE_PARAM_5_HI] = 0;
    MX_addNode(aNode2);
    
    aNode3[NODE_FUNC] = NODE_OUTPUT;
    // output position
    aNode3[NODE_PARAM_0_LO] = 7 + INPUTS;
    aNode3[NODE_PARAM_0_HI] = 0;
    // Node to get output from
    aNode3[NODE_PARAM_1_LO] = 9 + INPUTS;
    aNode3[NODE_PARAM_1_HI] = 0;
    MX_addNode(aNode3);

}