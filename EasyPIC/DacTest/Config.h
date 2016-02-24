#ifndef _CONFIG_H
#define _CONFIG_H

// there are two DACs in use, each one has 16 SH circuits connected to it by
// means of a 1-to-16 mux
#define SR_OUTPUTS 16 // shift register outputs
#define OUTPUTS SR_OUTPUTS * 2

#define MAX_OPERATIONS 20

#endif