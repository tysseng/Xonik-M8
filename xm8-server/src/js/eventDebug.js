var events = require("./eventbusses.js");

function setupEventDebugging(){
	// event debugger
	events.controls.output.subscribe("controller", function(ev){
		console.log("output ctrl " + ev.detail.id + ":" + ev.detail.value);
	});
	events.controls.input.subscribe("3", function(ev){
		console.log("input ctrl 3: " + ev.detail);
	});
}

module.exports = setupEventDebugging();