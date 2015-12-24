var output = {};
var input = {};

function setInputOutputMappings(controller){
	output[controller.intId] = controller;
	input[controller.extId] = controller;
}

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

var controllerCount = controllers.length;
for(var i = 0; i < controllerCount; i++){
	setInputOutputMappings(controllers[i]);
}

var mappings = {
    input: input,
    output: output
}

module.exports = mappings;