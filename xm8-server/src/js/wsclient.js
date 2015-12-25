var events = require("./eventbusses.js");
var maps = require("./controllerSetup.js");

function createMessage(id, value){
  return id + "," + value;
}

function parseMessage(message){
  var parts = message.split(",");
  return {
    id: parts[0],
    value: parts[1]
  }
}

function wsConnect(){
  if ("WebSocket" in window) {
    console.log("WebSocket is supported by your Browser!");
      
    var ws = new WebSocket("ws://localhost:3000/controller");
    ws.onopen = function(){
      console.log("Connected to XM8 server");

      events.controls.output.subscribe("controller", function(ev){      
        var mapping = maps.output[ev.detail.id];
        if(mapping){
          var id = mapping.extId;

          var message = createMessage(id, ev.detail.value);
          console.log("sending message through ws: " + message);        
          ws.send(message);          
        }
      });
    }

    ws.onmessage = function(evt){ 
      var message = parseMessage(evt.data);  
      var mapping = maps.input[message.id];      
      var id = mapping.intId;

      console.log("received message through ws. id=" + id + ", value=" + message.value);  

      events.controls.input.publish(
        new CustomEvent(id, {detail: message.value})
      );              
    };
  } else {
    console.log("WebSocket not supported by your browser, cannot communicate with Xonik M8 server");
  }
}


module.exports = wsConnect();
