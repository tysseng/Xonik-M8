var events = require("./eventbusses.js");

function setupEventDebugging(){
	// event debugger
	events.controls.output.subscribe("3", function(ev){
		console.log("output ctrl 3: " + ev.detail);
	});
	events.controls.input.subscribe("3", function(ev){
		console.log("input ctrl 3: " + ev.detail);
	});
}

module.exports = setupEventDebugging();