#ifndef _TYPES_H
#define _TYPES_H

// datatype to use for matrix, makes it easier to switch between 8 and 16 bit
// operations later.
#define matrixint int
#define matrixintrange 65535
#define matrixintmin -32768
#define matrixintmax 32767

#define matrixlongint long
#define matrixlongintrange 4294967295
#define matrixlongintmin -2147483648
#define matrixlongintmax 2147483647

// placements in note on/off message
#define NOTE_POS_PITCH 2
#define NOTE_POS_VELOCITY 3

// placements in Node data array when creating Node through spi
#define NODE_POSITION_HI 2
#define NODE_POSITION_LO 3
#define NODE_FUNC 4
#define NODE_PARAM_0_HI 5
#define NODE_PARAM_0_LO 6
#define NODE_PARAM_1_HI 7
#define NODE_PARAM_1_LO 8
#define NODE_PARAM_2_HI 9
#define NODE_PARAM_2_LO 10
#define NODE_PARAM_3_HI 11
#define NODE_PARAM_3_LO 12
#define NODE_PARAM_4_HI 13
#define NODE_PARAM_4_LO 14
#define NODE_PARAM_5_HI 15
#define NODE_PARAM_5_LO 16
#define NODE_PARAM_6_HI 17
#define NODE_PARAM_6_LO 18
#define NODE_PARAM_7_HI 19
#define NODE_PARAM_7_LO 20
#define NODE_PARAMS_IN_USE 21
#define NODE_RESULT_HI 22
#define NODE_RESULT_LO 23

// positions in matrix command buffer
#define MATRIX_CMD_KEY_POSITION 2

// placements in constants array when creating a constant through spi
#define CONST_POSITION_HI 2
#define CONST_POSITION_LO 3
#define CONST_VALUE_HI 4
#define CONST_VALUE_LO 5

// array lengths
#define CONSTS_COUNT_HI 2
#define CONSTS_COUNT_LO 3
#define NODES_COUNT_HI 2
#define NODES_COUNT_LO 3

// input positions
#define MATRIX_INPUT_PITCH 0
#define MATRIX_INPUT_VELOCITY 1
#define MATRIX_INPUT_GATE 2

// midi input cc positions
#define MIDI_INPUT_CC 2
#define MIDI_INPUT_CC_INPUT_NUM 3
#define MIDI_INPUT_CC_HI_RES 4

// output config
#define SPI_POS_OUTPUT_NUM 2
#define SPI_POS_OUTPUT_AS_LOG 3

// tuning conf
#define SPI_POS_GLOBAL_TUNING_HI 2
#define SPI_POS_GLOBAL_TUNING_LO 3

typedef struct matrixNode{
    // function to run when this Node is accessed.
    // Equals typedef nodeFunction, but that type cannot be declared before
    // this struct and cannot be used before it is declared.
    void (*func)(struct matrixNode *);

    // parameters passed to this node
    matrixint* params[8];

    // Looping over nodes is faster if the Node size is a multiple of 2 (as
    // getting the address is then only a matter of shifting left instead
    // of multiplying/summing.
    short arrayToMakeStruct64Bytes[12];

    // Bitwise variable that indicates usage of params:
    // 1 signifies that param is a constant
    // 0 that it is the index of the Node to get result from
    unsigned short paramIsConstant;

    // How many of the input params are used
    unsigned short paramsInUse;

    // high res status variable for ramps etc, to reduce effects of rounding
    // errors.
    long highResState;

    // state, holds flags for
    short state;

    // placeholder for result from Node function
    matrixint* result;

} Node;


// Function pointer to a matrix node function. In MikroC for PIC32, it does
// not work to have this typedef BEFORE the declaration of matrixNode when
// the parameter is a pointer (it works in MikroC for PIC though).
// This means that the type nodeFunction cannot be used in the matrixNode
// struct definition, instead we have to use the full pointer signature

// This is a confirmed bug in mC for PIC32:
// http://www.mikroe.com/forum/viewtopic.php?f=164&t=67056&p=268549#p268549
typedef void (*nodeFunction)(Node *);
#endif