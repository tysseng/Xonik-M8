var events = require("./eventbusses.js");

function setupEventDebugging(){
	events.controls.output.on("controller", function(ev){
		console.log("output ctrl " + ev.id + ":" + ev.value);
	});
	events.controls.input.on("volume", function(ev){
		console.log("input ctrl volume: " + ev);
	});
}

module.exports = setupEventDebugging();