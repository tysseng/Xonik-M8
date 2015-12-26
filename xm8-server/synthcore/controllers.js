/*
 Holds current state for all controllers. Not sure what it will be used for yet, perhaps save/load patch
*/

var eventbus = require('./eventbus.js');

var controllers = {};

function init(){
	for(var i = 0; i<128; i++){
		controllers["" + i] = 0;
	}
	console.log("Controllers initialized");
	eventbus.controls.on("controller", setValue);
}

function setValue(event){
	var id = event.id;
	var src = event.source;
	var value = event.value;

	controllers[id] = value;
	console.log("Set state for controller " + id + " to " + controllers[id] + " from " + src);
}

init();