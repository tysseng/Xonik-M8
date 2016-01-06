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
      read();
    }
  });
  gpio.setup(config.spi.interruptPin, gpio.DIR_IN, gpio.EDGE_BOTH, function(err){
    if(err) throw err;
    console.log("Setup spi slave interrupt on physical pin " + config.spi.interruptPin);
    
    // do an initial read of the interrupt pin as it may have been high when the program started.
    gpio.read(config.spi.interruptPin, function(err, value) {
      if(err) throw err;
      if(value){
        read();
      }
    });
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
  spi.read(new Buffer(1), function(device, typeBuffer) {
    var type = typeBuffer[0];
    var bufferLength = getBufferLength(type);

    // read data bytes
    spi.read(new Buffer(bufferLength), function(device, valueBuffer) {
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
function getBufferLength(type){
  switch(type){
    case types.CTRL_8_BIT:
      return 2;
    case types.CTRL_16_BIT:
      return 3;
    default:
      return 0;
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
