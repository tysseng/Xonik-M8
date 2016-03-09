#include "test/munit.h"
#include "test/asserts.h"
#include "Spi.h"
#include "Matrix.h"
#include "Spi.test.h"
#include "Spi.internal.h"

char lastPackage[MAX_PACKAGE_SIZE];

void storePackage(char* package){
  char i;
  for(i = 0; i<package[0]; i++){
    lastPackage[i] = package[i];
  }
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

  for(i = 0; i<MAX_PACKAGE_SIZE; i++){
    lastPackage[i] = 0;
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
  receiveByte(3); // length = 3
  receiveByte(PT_TEST); // type that triggers test function on receive
  receiveByte(2);
  
  SPI_checkForReceivedData();
  
  assertEquals(3, lastPackage[0], "Incorrect package value 0");
  assertEquals(PT_TEST, lastPackage[1], "Incorrect package value 0");
  assertEquals(2, lastPackage[2], "Incorrect package value 0");
}

void test_that_command_is_not_called_when_not_all_bytes_are_ready(){
  receiveByte(3); // length = 3
  receiveByte(PT_TEST); // type that triggers test function on receive

  SPI_checkForReceivedData();

  assertEquals(0, lastPackage[0], "No command should have been treated");
}

void test_that_multiple_commands_may_be_treated(){
  receiveByte(3); // length = 3
  receiveByte(PT_TEST); // type that triggers test function on receive
  receiveByte(4);

  receiveByte(4); // length = 3
  receiveByte(PT_TEST); // type that triggers test function on receive
  receiveByte(2);
  receiveByte(2);

  SPI_checkForReceivedData();

  assertEquals(2, lastPackage[2], "Wrong last command");
}

void test_that_only_first_command_is_treated_if_second_is_incomplete(){
  receiveByte(3); // length = 3
  receiveByte(PT_TEST); // type that triggers test function on receive
  receiveByte(4);

  receiveByte(4); // length = 3
  receiveByte(PT_TEST); // type that triggers test function on receive

  SPI_checkForReceivedData();

  assertEquals(3, lastPackage[0], "Wrong last command");
}

void test_that_positive_8bit_controllers_are_converted_correctly(){
  char package[] = {4, CTRL_8_BIT, 0, 0b01111111}; // +127 signed

  updateControllerFromSpi8bit(package);

  assertEquals(32512, MX_inputBuffer[0], "Wrong conversion of positive 8 bit num");
}

void test_that_negative_8bit_controllers_are_converted_correctly(){
  char package[] = {4, CTRL_8_BIT, 0, 0b10000000}; // -128 signed

  updateControllerFromSpi8bit(package);

  assertEquals(-32768, MX_inputBuffer[0], "Wrong conversion of negative 8 bit num");
}


void test_that_positive_16bit_controllers_are_converted_correctly(){
  char package[] = {5, CTRL_16_BIT, 0, 0b01111111, 0b11111111}; // +32767 signed

  updateControllerFromSpi16bit(package);

  assertEquals(32767, MX_inputBuffer[0], "Wrong conversion of positive 16 bit num");
}

void test_that_negative_16bit_controllers_are_converted_correctly(){
  char package[] = {5, CTRL_16_BIT, 0, 0b10000000, 0b00000000}; // -32768 signed

  updateControllerFromSpi16bit(package);

  assertEquals(-32768, MX_inputBuffer[0], "Wrong conversion of negative 16 bit num");
}


// setup and run test suite
void runSpiTests(){
  resetTests();

  add(&test_that_received_byte_is_placed_in_rxbuffer);
  add(&test_that_write_pos_wraps);
  add(&test_that_rxlength_is_set_on_first_byte);
  add(&test_that_rxbytecounter_is_reset_when_last_byte_is_received);
  add(&test_that_package_is_received_by_spi);
  add(&test_that_command_is_not_called_when_not_all_bytes_are_ready);
  add(&test_that_multiple_commands_may_be_treated);
  add(&test_that_only_first_command_is_treated_if_second_is_incomplete);
  add(&test_that_positive_8bit_controllers_are_converted_correctly);
  add(&test_that_negative_8bit_controllers_are_converted_correctly);
  add(&test_that_positive_16bit_controllers_are_converted_correctly);
  add(&test_that_negative_16bit_controllers_are_converted_correctly);
  run(resetSpi);
}