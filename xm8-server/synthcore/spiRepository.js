var eventbus = require('./eventbus.js');
var spi = require('./spi.js');

//Call this from receiver
function publishControllerChange(message){
  var event = fromSpiMessage(message);
  eventbus.controls.emit("controller", event);
  console.log("Published event from SPI: " + event.id + " to " + event.value);
}

function listenToControllerChanges(){
  eventbus.controls.on("controller",function(event){
    if(event.source !== "spi"){
      sendController(toSpiMessage(event));
    }
  });
}

function fromSpiMessage(message){
  var idStr = message.substring(0, 3);
  var id = parseInt(idStr);

  var valueStr = message.substr(3,6);
  var value = parseInt(valueStr);

  return {source: "spi", id: id, value: value};
}

function toSpiMessage(event){
  return zeroPad(event.id) + zeroPad(event.value); 
}

function zeroPad(value){
  if(value > 99){
  	return "" + value;
  } else if(value > 9){
  	return "0" + value;
  } else {
  	return "00" + value;
  }
}

function sendController(message){
  // loopback
  publishControllerChange(message);
  
  // implement spi send here
  console.log("Trying to send controller " + message + " through SPI");  
}


listenToControllerChanges();