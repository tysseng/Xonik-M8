#include "Matrix.h"
#include "Nodetypes.h"
#include "Types.h"

void TM_setupTestMatrix(){
    char aNode0[21], aNode1[21], aNode2[21], aNode3[21];
    
    aNode0[NODE_FUNC] = NODE_INPUT;
    aNode0[NODE_PARAM_0_LO] = 0;
    aNode0[NODE_PARAM_0_HI] = 0;
    aNode0[NODE_PARAM_IS_CONSTANT] = 0b0000001;
    MX_addNode(aNode0);

    aNode1[NODE_FUNC] = NODE_OUTPUT;
    aNode1[NODE_PARAM_0_LO] = 1;
    aNode1[NODE_PARAM_0_HI] = 0;
    aNode1[NODE_PARAM_1_LO] = 0;
    aNode1[NODE_PARAM_1_HI] = 0;
    aNode1[NODE_PARAM_IS_CONSTANT] = 0b0000001;
    MX_addNode(aNode1);
    
    aNode2[NODE_FUNC] = NODE_LFO_PULSE;
    aNode2[NODE_PARAM_0_LO] = 4;
    aNode2[NODE_PARAM_0_HI] = 0;
    aNode2[NODE_PARAM_1_LO] = 1;
    aNode2[NODE_PARAM_1_HI] = 0;
    aNode2[NODE_PARAM_2_LO] = 1;
    aNode2[NODE_PARAM_2_HI] = 0;
    aNode2[NODE_PARAM_3_LO] = 0xe8;
    aNode2[NODE_PARAM_3_HI] = 0x03;
    aNode2[NODE_PARAM_4_LO] = 0x18;
    aNode2[NODE_PARAM_4_HI] = 0xfc;
    aNode2[NODE_PARAM_5_LO] = 0;
    aNode2[NODE_PARAM_5_HI] = 0;

    aNode2[NODE_PARAM_IS_CONSTANT] = 0b00111111;
    MX_addNode(aNode2);
    
    aNode3[NODE_FUNC] = NODE_OUTPUT;
    aNode3[NODE_PARAM_0_LO] = 2;
    aNode3[NODE_PARAM_0_HI] = 0;
    aNode3[NODE_PARAM_1_LO] = 2;
    aNode3[NODE_PARAM_1_HI] = 0;
    aNode3[NODE_PARAM_IS_CONSTANT] = 0b0000001;
    MX_addNode(aNode3);

}