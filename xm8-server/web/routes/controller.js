
// TODO: Find better name, controller makes it hard to read.
var controller = require('../../core/controller/controller.js');
var tools = require('./routeTools');

module.exports = function(app, ws){

  var root = "/controller";

  app.ws(root, function(ws, req) {
    console.log("Something connected to controller");

    ws.on('message', function(msg) {
      controller.publishControllerChange(msg, ws);
    });
  });

  // register controller web socket return function
  var controllerWss = ws.getWss(root);
  controller.onControllerChange(tools.sendToAllClients.bind(null, controllerWss));

  /*
  app.stateWsclient('/echo', function(stateWsclient, req) {
    console.log("Something connected to echo resource");
    stateWsclient.on('message', function(msg) {
      console.log("message received");
      publishControllerChange(msg);

      var aWebSocketService = stateWsclient.getWss('/echo');
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
