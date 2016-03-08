#include "test/munit.h"
#include "test/asserts.h"
#include "Spi.h"
#include "Spi.test.h"
#include "Spi.internal.h"

char* lastPackage;

void storePackage(char* package){
  lastPackage = package;
}

void resetSpi(){
  unsigned int i;
  rxWritePos = 0;
  rxReadPos = 0;
  bytesInRxBuffer = 0;
  rxlength = 0;
  rxbytecounter = 0;

  for(i = 0; i<256; i++){
    rxbuffer[i] = 0;
  }
}

void test_that_received_byte_is_placed_in_rxbuffer(){
  receiveByte(123);
  assertEquals(123, rxbuffer[0], "Incorrect value in buffer");
  assertEquals(1, rxWritePos, "Write position not updated");
  assertEquals(1, bytesInRxBuffer, "Wrong number of bytes in buffer");
}

void test_that_write_pos_wraps(){
  rxWritePos = 255;
  receiveByte(123);
  assertEquals(0, rxWritePos, "Write pos wrapped incorrectly");
}

void test_that_rxlength_is_set_on_first_byte(){
  receiveByte(4);
  assertEquals(4, rxlength, "RX length not set on first byte");
  assertEquals(1, rxbytecounter, "RX byte counter not incremented");
}

void test_that_rxbytecounter_is_reset_when_last_byte_is_received(){
  receiveByte(3); // length = 3
  receiveByte(1);
  receiveByte(2);
  
  assertEquals(0, rxbytecounter, "RX byte counter not reset");
}

void test_that_package_is_received_by_spi(){
  //receiveByte(3); // length = 3
 // receiveByte(PT_TEST); // type that triggers test function on receive
 // receiveByte(2);
  
  SPI_checkForReceivedData();
  
  assertEquals(3, lastPackage[0], "Incorrect package value 0");
  assertEquals(PT_TEST, lastPackage[1], "Incorrect package value 0");
  assertEquals(2, lastPackage[2], "Incorrect package value 0");
}

// setup and run test suite
void runSpiTests(){
  resetTests();
  add(&test_that_received_byte_is_placed_in_rxbuffer);
  add(&test_that_write_pos_wraps);
  add(&test_that_rxlength_is_set_on_first_byte);
  add(&test_that_rxbytecounter_is_reset_when_last_byte_is_received);
  add(&test_that_package_is_received_by_spi);
  run(resetSpi);
}