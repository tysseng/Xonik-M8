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