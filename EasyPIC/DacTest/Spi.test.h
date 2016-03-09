// expose internal spi functions for testing.
extern char rxWritePos;
extern char rxReadPos;
extern char bytesInRxBuffer;
extern char rxbuffer[256];
extern char rxlength;
extern char rxbytecounter;
extern enum packageTypes;

//extern void storePackage(char* package);

extern void updateControllerFromSpi(unsigned short id, unsigned short value);
extern void receiveByte(char rxbyte);

extern void runSpiTests();