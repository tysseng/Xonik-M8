var eventbus = require('./eventbus.js');
var config = require('./config.js');
var gpio = require('rpi-gpio');
var SPI = require('spi');

var spi;
var readCallback;

// watch changes on pin that indicates that the SPI slave has data it wants transferred 
// to the master.
function initInterrupt(){
  gpio.on('change', function(channel, value) {
    if(value > 0){
      console.log("Interrupt triggered on SPI slave transmit pin");
      read();    
    } else {
      console.log("Interrupt reset on SPI slave transmit pin");
    }
  });
  gpio.setup(config.spi.interruptPin, gpio.DIR_IN, gpio.EDGE_BOTH);
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
  //TODO: Extend to read multiple types and lengths.
  var buffer = new Buffer([0x00, 0x00, 0x00]);
  spi.write(buffer, function(device, buf) {
    for(i = 0; i<buf.length, i++){
      console.log("wrote " + buf[i] + " to SPI");
    }
  });

  if(readCallback){
    readCallback(buffer);
  }
}

function write(buffer){
    spi.write(buffer, function(device, buf) {
      for(i = 0; i<buf.length, i++){
        console.log("wrote " + buf[i] + " to SPI");
      }
    });
}

initSPI();
initInterrupt();

module.exports.write = write;
module.exports.setReadCallback = setReadCallback;