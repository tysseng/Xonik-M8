#ifndef _SPI_INTERNAL_H
#define _SPI_INTERNAL_H

#define MAX_PACKAGE_SIZE 21

enum packageTypes {
  SPI_CMD_CTRL_8_BIT = 0,
  SPI_CMD_CTRL_16_BIT,
  SPI_CMD_NODE,
  SPI_CMD_CONSTANT,
  SPI_CMD_NODE_COUNT,
  SPI_CMD_CONSTANTS_COUNT,
  SPI_CMD_MATRIX_COMMAND,
  SPI_CMD_PT_TEST,
  SPI_CMD_NOTE_ON,
  SPI_CMD_NOTE_OFF,
  SPI_CMD_CONF_MIDI_CC_INPUT,
  SPI_CMD_TUNE,
  SPI_CMD_GLOBAL_TUNE
};

void receiveByte(char rxbyte);
extern void updateControllerFromSpi8bit(char* package);
extern void updateControllerFromSpi16bit(char* package);
extern void setInputConfigForCC(char* package);
extern void setNoteOn(char* package);
extern void void setOutputSlopeConfig(char* package);
extern void storePackage(char* package);
#endif