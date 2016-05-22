#ifndef _SPI_H
#define _SPI_H

void SPI_init();
void SPI_checkForReceivedData();
void SPI_mockReceive(char* buffer);

void SPI_SEND_noteOn(char voice, char pitch, char velocity);
void SPI_SEND_noteOff(char voice);

#endif