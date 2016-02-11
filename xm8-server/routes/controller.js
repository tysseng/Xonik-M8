var spiController = require('../core/spiController');
var tools = require('./routeTools');

module.exports = function(app, ws){

  var root = "/controller";

	app.ws(root, function(ws, req) {
	  console.log("Something connected to controller");

	  ws.on('message', function(msg) {
	    spiController.publishControllerChange(msg);
	  });
	});

	// register web socket return function
	var controllerWss = ws.getWss(root);
	spiController.onControllerChange(tools.sendToAllClients.bind(null, controllerWss));

	/*
	app.ws('/echo', function(ws, req) {
	  console.log("Something connected to echo resource");
	  ws.on('message', function(msg) {
	    console.log("message received");
	    publishControllerChange(msg);

	    var aWebSocketService = ws.getWss('/echo');
	    aWebSocketService.clients.forEach(function (client) {
	      try{
	        console.log("Resending " + msg);
	        client.send(msg);
	      } catch (ex){
	        console.log("Client not available");
	      }
	    });    
	  });
	});*/


}