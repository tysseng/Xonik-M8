#define NUMBER_OF_POTMETERS 4

extern short prevPotmeterDirection[NUMBER_OF_POTMETERS];
extern int potmeterValues[NUMBER_OF_POTMETERS];

void updateIfChanged(char i, unsigned int sample);
void updatePotmeterValue(char pot, char direction, int value);