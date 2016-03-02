#include "Matrix.h"
#include "Nodetypes.h"
#include "Types.h"

void TM_setupTestMatrix(){
    char aNode0[18], aNode1[18];
    
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
}