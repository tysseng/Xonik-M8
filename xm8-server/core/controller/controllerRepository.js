// the spi repository serializes, sends and receives data through the SPI bus. 
// It communicates through events and exports nothing.

var eventbus = require('./eventbus.js');
var spi = require('./spi-fd.js');
var config = require('./config.js');
var ctrlConfig = require('../shared/controllerSetup.js');
var types = require('../shared/datatypes.js');

function publishControllerChange(buffer){
  var event = fromSpiBuffer(buffer);

  if(event.type === types.CTRL_8_BIT || event.type === types.CTRL_16_BIT){
    eventbus.controls.emit("controller", event);
    console.log("Published event from SPI: " + event.id + " to " + event.value);    
  }
}

function listenToControllerChanges(){
  eventbus.controls.on("controller",function(event){
    if(event.sourceType !== "spi"){
      sendController(toSpiBuffer(event));
    }
  });
}

function fromSpiBuffer(buffer){
  var controller = ctrlConfig.hw[buffer[1]]; 
  if(controller){
    var type = controller.type;
    var id = controller.srvId;
    var value = getValueFromSpi(type, buffer);
    console.log("Converted spi buffer - type: " + type + ", id: " + id + ", value: " + value);
    return {source: this, sourceType: "spi", type: type, id: id, value: value};
  } else {
    return {source: this, Type: "spi", type: types.UNKNOWN, id: -1, value: -1}
  }
}

function getValueFromSpi(type, buffer){
  switch(type){
    case types.CTRL_8_BIT:
      return buffer[2];
    case types.CTRL_16_BIT:
      return buffer[2] + buffer[3] * 256;
  }
}

function toSpiBuffer(event){
  var controller = ctrlConfig.srv[event.id];
  var type = controller.type;
  var id = controller.hwId;
  switch(type){
    case types.CTRL_8_BIT:
      return new Buffer([3, id, event.value]); 
    case types.CTRL_16_BIT:
      return new Buffer([4, id, event.value, event.value / 256 ]); 
    default:
      return 0; 
  }
}

function sendController(buffer){
  if(config.spi.loopback){
    console.log("SPI loopback, resending");
    for(var i = 0; i<buffer.length; i++){
      console.log(buffer[i]);
    }    
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
