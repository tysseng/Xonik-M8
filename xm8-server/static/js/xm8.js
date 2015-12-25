(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// controller config, mapping internal/gui controllers to hardware controller ids etc.
var controllers = [
	{
		intId: "volume",
		extId: 2,
		name: "Volume"
	},
	{
		intId: "frequency",
		extId: 3,
		name: "Frequency"
	},
];

var output = {};
var input = {};

function setInputOutputMappings(controller){
	output[controller.intId] = controller;
	input[controller.extId] = controller;
}

var controllerCount = controllers.length;
for(var i = 0; i < controllerCount; i++){
	setInputOutputMappings(controllers[i]);
}

var mappings = {
    input: input,
    output: output
}

module.exports = mappings;
},{}],2:[function(require,module,exports){
var events = require("./eventbusses.js");

function setupEventDebugging(){
	events.controls.output.subscribe("controller", function(ev){
		console.log("output ctrl " + ev.detail.id + ":" + ev.detail.value);
	});
	events.controls.input.subscribe("volume", function(ev){
		console.log("input ctrl volume: " + ev.detail);
	});
}

module.exports = setupEventDebugging();
},{"./eventbusses.js":3}],3:[function(require,module,exports){
var EventBus = function(){};
EventBus.prototype.subscribe = function(event, fn) {
    $(this).bind(event, fn);
};
EventBus.prototype.publish = function(event) {
    $(this).trigger(event);
};

var busses = {
    controls: {
        input: new EventBus(),
        output: new EventBus()
    }
}

module.exports = busses;
},{}],4:[function(require,module,exports){
var events = require("./eventbusses.js")
	
function initKnob(){

	$('.ctrl1').knobKnob({
		snap : 10,
		value: 154,
		inEventBus: events.controls.input,
		outEventBus: events.controls.output,
		controllerId: "volume"
	});

}

module.exports = initKnob();


},{"./eventbusses.js":3}],5:[function(require,module,exports){
require('./wsclient.js');
require('./knobWithRing.js');
require('./eventDebug.js');

console.log("Starting Xonik M8");

},{"./eventDebug.js":2,"./knobWithRing.js":4,"./wsclient.js":6}],6:[function(require,module,exports){
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

},{"./controllerSetup.js":1,"./eventbusses.js":3}]},{},[5]);
