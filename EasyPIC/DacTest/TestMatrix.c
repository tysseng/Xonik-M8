#include "Matrix.h"
#include "Nodetypes.h"
#include "Types.h"
#include "Spi.h"

void TM_setupTestMatrix(){
  char stop[]     = {0x03, 0x06, 0x03};
  char cycle[]    = {0x06, 0x03, 0x00, 0x40, 0x00, 0x04};
  char pw[]       = {0x06, 0x03, 0x00, 0x41, 0x00, 0x01};
  char trigger[]  = {0x06, 0x03, 0x00, 0x42, 0x00, 0x01};
  char max[]      = {0x06, 0x03, 0x00, 0x43, 0x7d, 0x00};
  char min[]      = {0x06, 0x03, 0x00, 0x44, 0x83, 0x00};
  char start[]    = {0x06, 0x03, 0x00, 0x45, 0x00, 0x00};
  char output[]   = {0x06, 0x03, 0x00, 0x46, 0x00, 0x00};
  char constlen[] = {0x04, 0x05, 0x00, 0x07};
  char lfonode[]  = {0x18, 0x02, 0x00, 0x47, 0x07, 0x00, 0x40, 0x00, 0x41, 0x00, 0x42, 0x00, 0x43, 0x00, 0x44, 0x00, 0x45, 0x00, 0x00, 0x00, 0x00, 0x06, 0x00, 0x00};
  char outputnode[] = {0x18, 0x02, 0x00, 0x48, 0x13, 0x00, 0x47, 0x00, 0x46, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x00, 0x00};
  char nodelen[]  = {0x04, 0x04, 0x00, 0x02};

 //SPI_mockReceive(stop);
  SPI_mockReceive(cycle);
  SPI_mockReceive(pw);
  SPI_mockReceive(trigger);
  SPI_mockReceive(max);
  SPI_mockReceive(min);
  SPI_mockReceive(start);
  SPI_mockReceive(output);
  SPI_mockReceive(constlen);
  SPI_mockReceive(lfonode);
  SPI_mockReceive(outputnode);
  SPI_mockReceive(nodelen);
 // SPI_mockReceive({0x03, 0x06, 0x03});
}

void TsM_setupTestMatrix(){
    char aNode0[21], aNode1[21], aNode2[21], aNode3[21];

    MX_addConstant(4);
    MX_addConstant(1);
    MX_addConstant(1);
    MX_addConstant(0x7D00);
    MX_addConstant(0x8300);
    MX_addConstant(0);

    aNode2[NODE_FUNC] = NODE_LFO_PULSE;
    // cycle length
    aNode2[NODE_PARAM_0_LO] = 0 + INPUTS; // cycle length 4
    aNode2[NODE_PARAM_0_HI] = 0;
    // pulse width
    aNode2[NODE_PARAM_1_LO] = 1 + INPUTS; // pulse width 1
    aNode2[NODE_PARAM_1_HI] = 0;
    // trigger
    aNode2[NODE_PARAM_2_LO] = 2 + INPUTS; // trigger 1
    aNode2[NODE_PARAM_2_HI] = 0;
    // positive
    aNode2[NODE_PARAM_3_LO] = 3 + INPUTS; // 32000
    aNode2[NODE_PARAM_3_HI] = 0;
    // negative
    aNode2[NODE_PARAM_4_LO] = 4 + INPUTS; // -32000
    aNode2[NODE_PARAM_4_HI] = 0;
    aNode2[NODE_PARAM_5_LO] = 0;
    aNode2[NODE_PARAM_5_HI] = 0;
    aNode2[NODE_PARAMS_IN_USE] = 6;
    MX_addNode(aNode2);
    
    aNode3[NODE_FUNC] = NODE_OUTPUT;
    // Node to get output from
    aNode3[NODE_PARAM_0_LO] = 7 + INPUTS; // Node 2 (lfo pulse)
    aNode3[NODE_PARAM_0_HI] = 0;
    // output position
    aNode3[NODE_PARAM_1_LO] = 5 + INPUTS; // output 0
    aNode3[NODE_PARAM_1_HI] = 0;

    aNode2[NODE_PARAMS_IN_USE] = 2;
    MX_addNode(aNode3);

}