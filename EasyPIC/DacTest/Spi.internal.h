#ifndef _SPI_INTERNAL_H
#define _SPI_INTERNAL_H

#define MAX_PACKAGE_SIZE 21

enum packageTypes {
  CTRL_8_BIT = 0,
  CTRL_16_BIT,
  NODE,
  CONSTANT,
  NODE_COUNT,
  CONSTANTS_COUNT,
  MATRIX_COMMAND,
  PT_TEST
};

void receiveByte(char rxbyte);
extern void updateControllerFromSpi8bit(char* package);
extern void updateControllerFromSpi16bit(char* package);
extern void storePackage(char* package);
#endif