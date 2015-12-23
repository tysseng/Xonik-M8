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