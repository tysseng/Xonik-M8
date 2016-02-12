// kickstarts the spi repo.
var spiRepository = require('./spiRepository.js');
var ctrlSetup = require('../shared/controllerSetup.js');
var eventbus = require('./eventbus.js');
var controllers = require('./controllers.js');

var onControllerChangeCallback;

function publishControllerChange(message, source){
  var msgParts = message.split(',');
  var id = msgParts[0];
  var type = ctrlSetup.srv[id].type;
  var value = msgParts[1];

  eventbus.controls.emit("controller", {type: type, source: source, sourceType: "gui", id: id, value: value});
  
  console.log("Published event from GUI: " + id + " to " + value);
}

function listenToControllerChanges(){
  eventbus.controls.on("controller",function(event){
//    if(event.source !== "gui"){
        console.log("Received event from " + event.sourceType + " in core controller");
        if(onControllerChangeCallback) onControllerChangeCallback(event.source, "" + event.id + "," + event.value);
//    }
  });
}

function onControllerChange(callback){
  onControllerChangeCallback = callback;
}

// start listening
listenToControllerChanges();

module.exports.publishControllerChange = publishControllerChange;
module.exports.onControllerChange = onControllerChange;
