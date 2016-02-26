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

//node in matrix
typedef struct matrixNode{
    // function to run when this Node is accessed.
    // Equals typedef nodeFunction, but that type cannot be declared before
    // this struct and cannot be used before it is declared.
    void (*func)(struct matrixNode *);

    // parameters passed to this node
    matrixint params[8];

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
    matrixint result;

} Node;

// Function pointer to a matrix node function. In MikroC for PIC32, it does
// not work to have this typedef BEFORE the declaration of matrixNode when
// the parameter is a pointer (it works in MikroC for PIC though).
// This means that the type nodeFunction cannot be used in the matrixNode
// struct definition, instead we have to use the full pointer signature
typedef void (*nodeFunction)(Node *);

#endif