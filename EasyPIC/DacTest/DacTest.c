#define TX_INTERRUPT_TRIS TRISB1_bit
#define A0 LATD2_bit
#define A1 LATD3_bit
#define _WR LATD0_bit
#define LDAC LATD1_bit

#define DATA_LO LATA // porta/l - D0-D7
#define DATA_HI LATB // portb/l - D8-D15

// HW: 
//  _RS connected to V+
//  MSB connected to GND
//  AD5547 running off 3V3. Opamps running off +/-15V.
//  PSU GND connected to EasyPIC GND, AGND and DGND connected
//  Tested with TL072
//  Circuit connected as 4 quadrant (page 16 of reference manual/dual-dac-w-32-ch-sh-DAC-BOARD in eagle)

void main() {

  // disable JTAG to get control of all pins on PORTA/L
  JTAGEN_bit = 0;
  
  // select DAC A
  A0 = 0;
  A1 = 0;

  // set
  _WR = 1;
  LDAC = 0;
  
  delay_ms(1000);
  
  //Set ports as output
  TRISB = 0;
  LATB = 0;

  TRISD = 0;
  LATD = 0;
  
  TRISA = 0;
  LATA = 0;
  
  while(1){

    if(DATA_LO != 0){
      DATA_LO = 0;
      DATA_HI = 0;
    } else {
      DATA_LO = 0xFF;
      DATA_HI = 0xFF;
    }
    delay_ms(500);

    // load input register
    _WR=0;
    LDAC=0;
    delay_ms(500);
    
    // load DAC register
    _WR=1;
    LDAC=1;
    delay_ms(500);
    
    // reset state
    LDAC=0;

    delay_ms(2000);
  }
}