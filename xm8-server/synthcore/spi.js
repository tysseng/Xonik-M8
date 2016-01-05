var eventbus = require('./eventbus.js');
var config = require('./config.js');
var gpio = require('rpi-gpio');
var SPI = require('spi');
var types = require('../shared/datatypes.js');
var ctrlConfig = require('../shared/controllerSetup.js');
var exit = require('./exit.js');

var spi;
var readCallback;

// watch changes on pin that indicates that the SPI slave has data it wants transferred 
// to the master.
// NB: pin numbers are physical pin numbers, not gpioX-pin number. (e.g. GPIO7 = pin 26)
function initGPIO(){
  
  gpio.on('change', function(channel, value) {
    if(value > 0){
      console.log("Interrupt triggered on SPI slave transmit pin");
//      read();
    } else {
      console.log("Interrupt reset on SPI slave transmit pin");
    }
  });
  gpio.setup(config.spi.interruptPin, gpio.DIR_IN, gpio.EDGE_BOTH, function(err){
    if(err) throw err;
    console.log("Setup spi slave interrupt on physical pin " + config.spi.interruptPin);
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

function setReadCallback(callback){
  readCallback = callback;
}

function read(){
  // read byte to decide type and thus length
  spi.read(new Buffer[0x00], function(device, typeBuffer) {
    var type = typeBuffer[0];
    console.log("Received type " + type);

    // read data bytes
    spi.read(getValueBuffer(type), function(device, valueBuffer) {
      for(i = 0; i<valueBuffer.length; i++){
        console.log("read " + valueBuffer[i] + " from SPI");
      }
      var bufferContents = [];
      bufferContents.push(type);
      for(value of valueBuffer){
        bufferContents.push(value);
      }
      if(readCallback){
        readCallback(bufferContents);
      }
    });
  });
}

// Get a value buffer of the correct size for the type to be received.
// This means that some implementation details will leak down from the spi repo
// to the adapter. We COULD use a TLV format (Type, Length, Value), but this means
// a 33% overhead on 8 bit controllers. 
function getValueBuffer(type){
  if(type === type.CTRL_8_BIT){
    return new Buffer(2);
  } else if (type == type.CTRL_16_BIT){
    return new Buffer(3);
  }
}

function write(buffer){
  spi.write(buffer, function(device, buf) {
    for(i = 0; i<buf.length; i++){
      console.log("wrote " + buf[i] + " to SPI");
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
module.exports.setReadCallback = setReadCallback;
