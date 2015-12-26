(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var types = require('./datatypes.js');

// controller config, mapping internal/gui controllers to hardware controller ids etc.
var controllers = [
	{
		guiId: "volume",
		srvId: 2,
		hwId: 2,
		name: "Volume",
		type: types.CTRL_16_BIT
	},
	{
		guiId: "frequency",
		srvId: 3,
		hwId: 3,
		name: "Frequency",
		type: types.CTRL_8_BIT
	},
];

var gui = {};
var srv = {};
var hw = {};

function setMappings(controller){
	gui[controller.guiId] = controller;
	srv[controller.srvId] = controller;
	hw[controller.hwId] = controller;
}

var controllerCount = controllers.length;
for(var i = 0; i < controllerCount; i++){
	setMappings(controllers[i]);
}

var mappings = {
    gui: gui,
    srv: srv,
    hw: hw
}

module.exports = mappings;
},{"./datatypes.js":2}],2:[function(require,module,exports){
datatypes = {
	CTRL_8_BIT: 0,
	CTRL_16_BIT: 1
}

module.exports = datatypes;
},{}],3:[function(require,module,exports){
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
},{"./eventbusses.js":4}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
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


},{"./eventbusses.js":4}],6:[function(require,module,exports){
/*

//TODO: 
- controllers must be 8 bit, transmitting > 255 will wrap! 
	- scale controllers
	- support 16bit controller values.
- Protect receive from transmit - send must wait for interrupt to go low
*/

var wsclient = require('./wsclient.js');
require('./knobWithRing.js');
require('./eventDebug.js');

console.log($("#receiveOn"));

$('#receiveOn').click(function() {
    var $this = $(this);
    // $this will contain a reference to the checkbox   
    wsclient.toggleReceive($this.is(':checked'));
});

console.log("Starting Xonik M8");

},{"./eventDebug.js":3,"./knobWithRing.js":5,"./wsclient.js":7}],7:[function(require,module,exports){
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

},{"../../shared/controllerSetup.js":1,"./eventbusses.js":4}]},{},[6]);
