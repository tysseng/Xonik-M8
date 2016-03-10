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

    aNode0[NODE_FUNC] = NODE_INPUT;
    aNode0[NODE_PARAM_0_LO] = 0;
    aNode0[NODE_PARAM_0_HI] = 0;
    MX_addNode(aNode0);

    aNode1[NODE_FUNC] = NODE_OUTPUT;
    aNode1[NODE_PARAM_0_LO] = 1;
    aNode1[NODE_PARAM_0_HI] = 0;
    aNode1[NODE_PARAM_1_LO] = 8;
    aNode1[NODE_PARAM_1_HI] = 0;
    MX_addNode(aNode1);

    aNode2[NODE_FUNC] = NODE_LFO_PULSE;
    aNode2[NODE_PARAM_0_LO] = 2;
    aNode2[NODE_PARAM_0_HI] = 0;
    aNode2[NODE_PARAM_1_LO] = 3;
    aNode2[NODE_PARAM_1_HI] = 0;
    aNode2[NODE_PARAM_2_LO] = 4;
    aNode2[NODE_PARAM_2_HI] = 0;
    aNode2[NODE_PARAM_3_LO] = 5;
    aNode2[NODE_PARAM_3_HI] = 0;
    aNode2[NODE_PARAM_4_LO] = 6;
    aNode2[NODE_PARAM_4_HI] = 0;
    aNode2[NODE_PARAM_5_LO] = 0;
    aNode2[NODE_PARAM_5_HI] = 0;
    MX_addNode(aNode2);
    
    aNode3[NODE_FUNC] = NODE_OUTPUT;
    aNode3[NODE_PARAM_0_LO] = 7;
    aNode3[NODE_PARAM_0_HI] = 0;
    aNode3[NODE_PARAM_1_LO] = 10;
    aNode3[NODE_PARAM_1_HI] = 0;
    MX_addNode(aNode3);

}