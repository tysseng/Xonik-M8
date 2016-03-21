var types = require('../core/spi/spiTypes.js');

// controller config, mapping internal/gui controllers to hardware controller ids etc.
var controllers = [
	{
		guiId: "volume",
		srvId: 2,
		hwId: 0,
		name: "Volume",
		type: types.CTRL_16_BIT.id
	},
	{
		guiId: "frequency",
		srvId: 3,
		hwId: 1,
		name: "Frequency",
		type: types.CTRL_8_BIT.id
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
