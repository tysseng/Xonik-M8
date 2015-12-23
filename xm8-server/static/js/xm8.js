(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function setupEventDebugging(){
	// event debugger
	controllerOutEventBus.subscribe("3", function(ev){
		console.log("output ctrl 3: " + ev.detail);
	});
	controllerInEventBus.subscribe("3", function(ev){
		console.log("input ctrl 3: " + ev.detail);
	});
}

module.exports = setupEventDebugging();
},{}],2:[function(require,module,exports){
//TODO: Make this into a single reusable eventbus definition instead of two or more duplications

var controllerInEventBus = {
    subscribe: function(event, fn) {
        $(this).bind(event, fn);
    },
    publish: function(event) {
        $(this).trigger(event);
    }
};

var controllerOutEventBus = {
    subscribe: function(event, fn) {
        $(this).bind(event, fn);
    },
    publish: function(event) {
        $(this).trigger(event);
    }
};

var busses = {
    controls: {
        input: controllerInEventBus,
        output: controllerOutEventBus
    }
}

module.exports = busses;
},{}],3:[function(require,module,exports){
var events = require("./eventbusses.js")

var colors = [
	'26e000','2fe300','37e700','45ea00','51ef00',
	'61f800','6bfb00','77ff02','80ff05','8cff09',
	'93ff0b','9eff09','a9ff07','c2ff03','d7ff07',
	'f2ff0a','fff30a','ffdc09','ffce0a','ffc30a',
	'ffb509','ffa808','ff9908','ff8607','ff7005',
	'ff5f04','ff4f03','f83a00','ee2b00','e52000'
];

var rad2deg = 180/Math.PI;
var deg = 0;
var bars = $('#bars');

for(var i=0;i<colors.length;i++){
	
	deg = i*12;
	
	// Create the colorbars
	
	$('<div class="colorBar">').css({
		backgroundColor: '#'+colors[i],
		transform:'rotate('+deg+'deg)',
		top: -Math.sin(deg/rad2deg)*80+100,
		left: Math.cos((180 - deg)/rad2deg)*80+100,
	}).appendTo(bars);
}

var colorBars = bars.find('.colorBar');
var numBars = 0, lastNum = -1;
	
function initKnob(){

	$('#control').knobKnob({
		snap : 10,
		value: 154,
		inEventBus: events.controls.input,
		outEventBus: events.controls.output,
		controllerId: 3,
		turn : function(ratio){
			numBars = Math.round(colorBars.length*ratio);
			
			// Update the dom only when the number of active bars
			// changes, instead of on every move
			
			if(numBars == lastNum){
				return false;
			}
			lastNum = numBars;
			
			colorBars.removeClass('active').slice(0, numBars).addClass('active');
		}
	});
}

module.exports = initKnob();


},{"./eventbusses.js":2}],4:[function(require,module,exports){
require('./wsclient.js');
require('./knobWithRing.js');
require('./eventDebug.js');

console.log("Starting Xonik M8");

},{"./eventDebug.js":1,"./knobWithRing.js":3,"./wsclient.js":5}],5:[function(require,module,exports){
var events = require("./eventbusses.js");

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
      
    var ws = new WebSocket("ws://localhost:3000/echo");
    ws.onopen = function(){
      console.log("Connected to XM8 server");
      var id = "3";

      events.controls.output.subscribe(id, function(ev){        
        var message = createMessage(ev.type, ev.detail);
        console.log("sending message through ws: " + message);        
        ws.send(message);
      });
    }

    ws.onmessage = function(evt){ 
      var message = parseMessage(evt.data);         
      console.log("received message through ws. id=" + message.id + ", value=" + message.value);  

      events.controls.input.publish(
        new CustomEvent(message.id, {detail: message.value})
      );               
    };    

  } else {
    console.log("WebSocket not supported by your browser, cannot communicate with Xonik M8 server");
  }
}


module.exports = wsConnect();

},{"./eventbusses.js":2}]},{},[4]);
