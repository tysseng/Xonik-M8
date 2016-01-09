// Fullish-duplex version of spi adapter, data may be sent by the slave at any time even if master is
// currently transmitting.

// INTERRUPTS
// Interrupts are a bit interesting. It seems that if a pin with an interrupt bound to it changes 
// multiple times while the program is doing something else, only the last change will trigger an 
// event. 
//
// For example, if we listen to both edges (0->1 and 1->0) and the pin changes 0 -> 1 -> 0 
// while the program is busy writing to SPI, only the last change will trigger an event. 
// As javascript is single threaded, the event is not triggered untill the synchronous write code
// has completed.
//
// This behaviour is not necessarily a bad thing. If an interrupt arrives during write, data will
// be read anyway, and the interrupt is reset right after the last byte is received. Thus, the
// only triggered event is the lowering of the interrupt. This means that interrupts during write
// will not trigger a read once write is completed. 

// TODO: SPI error handling! Perhaps ink. checksums. Decide how to reset state if something
// goes wrong!

// NB: The code is written with the assumption that the SPI write/read is synchronous and that 
// the callbacks are called before control is released back to the system, so no other events
// may intermingle with the process.

var eventbus = require('./eventbus.js');
var config = require('./config.js');
var gpio = require('rpi-gpio');
var SPI = require('spi');
var types = require('../shared/datatypes.js');
var ctrlConfig = require('../shared/controllerSetup.js');
var exit = require('./exit.js');

var spi;
var readCallback;

// Watch changes on pin that indicates that the SPI slave has data it wants transferred 
// to the master.
// NB: pin numbers are physical pin numbers, not gpioX-pin number. (e.g. GPIO7 = pin 26)
function initGPIO(){
  
  gpio.on('change', function(pin, interruptStatus) {
    // I thought earlier that we would have  problem if an interrupt was received during write. Now 
    // it seems that such an interrupt will NOT trigger a change-to-positive event after all, as 
    // long as the interrupt pin is lowered again before the read is completed. 

    // Writing and reading is synchronous, so read/write will be completed before events are triggered
    if(pin == config.spi.interruptPin && interruptStatus != 0){
      console.log("Reading data from slave after interrupt was raised");
      read();
    }    
  });

  gpio.setup(config.spi.interruptPin, gpio.DIR_IN, gpio.EDGE_BOTH, function(err){
    if(err) throw err;
    console.log("Setup spi slave interrupt on physical pin " + config.spi.interruptPin);
    
    // Do an initial read of the interrupt pin as it may have been high when the program started.
    //checkInterruptPinAndReadIfNecessary();
    writeSome();
  });
}

function writeSome(){
  var buffer = new Buffer([10,1,2,3,4,5,6,7,8,9]);
  write(buffer);
}

function checkInterruptPinAndReadIfNecessary(){
  gpio.read(config.spi.interruptPin, function(err, value) {
    if(err) throw err;
    if(value){
      read();
    }
  });
}

function initSPI(){

  var spiConfig = {
    'mode': SPI.MODE[config.spi.mode],   
    'chipSelect': SPI.CS[config.spi.chipSelect], 
    'maxSpeed': config.spi.maxSpeed
  };

  spi = new SPI.Spi(
    config.spi.device, 
    spiConfig, 
    function(s){
      s.open();
    }
  );
}

function read(){
  // Transfer data from the slave to the server.

  // The master must send a buffer the size of the data it expects to receive in order
  // to run the clock that retrieves data from the slave.

  // When we start receiving data we do not know how much data the slave wants to send. This is
  // indicated by the first received byte.

  // Unfortunately, two successive reads from SPI, calling a second read within the callback of the
  // first read, incurrs a penalty of about 2ms on the Raspberry PI. This is quite significant as
  // a transmission speed of 1MHz would let us send 250 bytes in this interval.

  // As most reads from the slave will be tiny bursts of a few bytes, mostly controller updates, a 
  // reasonable trade off will be reading 16 bytes EVERY TIME instead of just retrieving 1 byte and 
  // check the length. Then, if the first byte indicates that the slave wants to send more than 
  // 16 bytes, retrieve the remainder. Transmissions of over 16 bytes will probably not be as time 
  // critical any way - they could be bulk status updates or similar.

  // Incidently, 16 bytes is the size of the enhanced buffer of the PIC32, which lets us write 
  // all data to the output buffer of the PIC32 in one go.
  
  // Since javascript is single threaded, and spi read/write are synchronous, reading and writing 
  // are completely isolated. Thus, we do not need to check if a read or write is in progress.
  var minBufferSize = config.spi.minBufferSize;

  spi.read(new Buffer(minBufferSize), function(device, rxbuffer) {
    var transmissionLength = rxbuffer[0];

    if(transmissionLength <= minBufferSize){
      triggerReadCallback(rxbuffer);      
    } else {
      readRemainder(rxbuffer, transmissionLength);
    }
  });
}

function readRemainder(initialBuffer, transmissionLength){
  var remainder = transmissionLength - initialBuffer.length;  

  console.log("Going to read remaining " + remainder + " bytes from slave");

  spi.read(new Buffer(remainder), function(device, remainderBuffer) {
    triggerReadCallback(initialBuffer, remainderBuffer);
  });  
}

function onRead(callback){
  readCallback = callback;
}

function triggerReadCallback(initialBuffer, remainderBuffer){
  var bufferContents = [];
  var bufferSize = 0;
  var transmissionLength = initialBuffer[0];

  // We may have received more bytes than the indicated transmission length
  // (Remember, we always read at least 16 bytes). Return only the real bytes.
  for(var i = 0; i<transmissionLength; i++){
    bufferContents.push(initialBuffer[i]);
  }

  // If a second read was necessary, add the data from this one as well. This
  // one will always be the correct number of bytes as we only read what is
  // requested the second time around.
  if(remainderBuffer){
    for(value of remainderBuffer){
      bufferContents.push(value);
    }    
  }

  if(readCallback){
    console.log("Received data: ");
    console.log(bufferContents);
    //readCallback(bufferContents);
  }  
}

function write(txbuffer){
  // Since javascript is single threaded, and spi read/write are synchronous, reading and writing
  // are completely isolated. Thus, we do not need to check if a read or write is in progress.
  console.log("Going to write " + txbuffer.length + " bytes");
 
    spi.transfer(txbuffer, new Buffer(txbuffer.length), function(device, rxbuffer) {
      // Detect if any data was received from the slave during write. The slave does not check
      // if a master send is in progress before it starts sending data, but it raises an interrupt.
      // This interrupt may be received while the master sends data, in which case parts of the 
      // data the slave wants to send will be received while the master writes data. 
      // We therefore have to check if any data was received and get the remainding data from 
      // the slave.
      var transmissionLength = 0;
      var receivedBytes = [];
      for(var i = 0; i<rxbuffer.length; i++){
        if(rxbuffer[i] > 0 ){
          transmissionLength = rxbuffer[i];
          break;
        }
      }

      if(transmissionLength > 0){       
        console.log("Slave sent " + (rxbuffer.length - i) + " of " + transmissionLength + " bytes during write");

        // discard the parts of the receive buffer that was not part of the slave's data
        // transmission, then read whatever is missing.
        var initialBuffer = rxbuffer.slice(i); 
        if(transmissionLength > initialBuffer.length){
          readRemainder(initialBuffer, transmissionLength);
        } else {
          triggerReadCallback(initialBuffer);
        }       
      }
    });
}

function onExit(){
  console.log("Cleaning up SPI module");
  gpio.destroy(function(){
    console.log("Closed all GPIO pins");
  });
  process.exit(1);
}

initSPI();
initGPIO();

// register cleanup function
exit.onExit(onExit);

module.exports.write = write;
module.exports.onRead = onRead;
