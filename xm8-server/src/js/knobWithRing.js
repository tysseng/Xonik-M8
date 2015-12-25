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

