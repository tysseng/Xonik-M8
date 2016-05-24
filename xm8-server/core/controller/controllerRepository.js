// the spi repository serializes, sends and receives data through the SPI bus. 
// It communicates through events and exports nothing.

var eventbus = require('../eventbus.js');
var spi = require('../spi/spi-fd.js');
var config = require('../../shared/config.js');
var ctrlConfig = require('../../shared/controllerSetup.js');
var spiType = require('../spi/spiType.js');
var serializer = require ('./serializer.js');

function publishControllerChange(buffer){
  var event = serializer.deserializeController(buffer, this);

  if(event.type === spiType.CTRL_8_BIT || event.type === spiType.CTRL_16_BIT){
    eventbus.controls.emit("controller", event);
    console.log("Published event from SPI: " + event.id + " to " + event.value);    
  }
}

function listenToControllerChanges(){
  eventbus.controls.on("controller",function(event){
    if(event.sourceType !== "spi"){
      sendController(serializer.serializeController(event));
    }
  });
}

function sendController(buffer){
  if(config.spi.loopback){
    console.log("SPI loopback, resending");
    console.log(buffer);
    publishControllerChange(buffer);  	
  } else {
    spi.write(buffer);
  }
}

function receive(buffer){
  //Todo - implement multiple types here. For now controller messages are the only ones.
  publishControllerChange(buffer);
}

listenToControllerChanges();
spi.onRead(receive); 
