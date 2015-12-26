var events = require("./eventbusses.js");
var ctrlSetup = require("../../shared/controllerSetup.js");

var receiveOn = true;

function createMessage(event){
  var id = ctrlSetup.gui[event.detail.id].srvId;
  return id + "," + event.detail.value;
}

function parseMessage(message){
  var parts = message.split(",");
  var id = ctrlSetup.srv[parts[0]].guiId; 
  return {
    id: id,
    value: parts[1]
  };
}

function wsConnect(){
  if ("WebSocket" in window) {
    console.log("WebSocket is supported by your Browser!");
      
    var ws = new WebSocket("ws://localhost:3000/controller");
    ws.onopen = function(){
      console.log("Connected to XM8 server");

      events.controls.output.subscribe("controller", function(event){      
        var message = createMessage(event);
        console.log("sending message through ws: " + message);        
        ws.send(message);          
      });
    }

    ws.onmessage = function(event){ 
      if(!receiveOn){
        return;
      }
      var message = parseMessage(event.data);  

      console.log("received message through ws. id=" + message.id + ", value=" + message.value);  

      events.controls.input.publish(
        new CustomEvent(message.id, {detail: message.value})
      );              
    };
  } else {
    console.log("WebSocket not supported by your browser, cannot communicate with Xonik M8 server");
  }
}

function toggleReceive(state){
  console.log("Switched ws client receive to " + state);
  receiveOn = state;
}

//Kickstart WS integration
wsConnect();

module.exports.toggleReceive = toggleReceive;
