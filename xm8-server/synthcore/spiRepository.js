// the spi repository serializes, sends and receives data through the SPI bus. 
// It communicates through events and exports nothing.

var eventbus = require('./eventbus.js');
//var spi = require('./spi.js');
var config = require('./config.js');


function publishControllerChange(buffer){
  var event = fromSpiBuffer(buffer);
  eventbus.controls.emit("controller", event);
  console.log("Published event from SPI: " + event.id + " to " + event.value);
}

function listenToControllerChanges(){
  eventbus.controls.on("controller",function(event){
    if(event.source !== "spi"){
      sendController(toSpiBuffer(event));
    }
  });
}

function fromSpiBuffer(buffer){
  var id = buffer[0];
  var value = buffer[1];

  return {source: "spi", id: id, value: value};
}

function toSpiBuffer(event){
  return new Buffer([event.id, event.value]); 
}

function sendController(buffer){
  if(config.spi.loopback){
    publishControllerChange(buffer);  	
  } else {
  	//spi.write(buffer);
  }
}

function receive(buffer){
	//Todo - implement multiple types here. For now controller messages are the only ones.
	publishControllerChange(buffer);
}

listenToControllerChanges();
//spi.setReceiveCallback(receive);