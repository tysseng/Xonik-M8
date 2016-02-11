
// TODO: Find better name, controller makes it hard to read.
var controller = require('../core/controller');
var tools = require('./routeTools');

module.exports = function(app, ws){

  var root = "/controller";

  app.ws("/controller", function(ws, req) {
    console.log("Something connected to controller");

    ws.on('message', function(msg) {
      controller.publishControllerChange(msg);
    });
  });

  // register web socket return function
  var controllerWss = ws.getWss(root);
  controller.onControllerChange = function(data){
    tools.sendToAllClients.bind(controllerWss, data); 
  }

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
