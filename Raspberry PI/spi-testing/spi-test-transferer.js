var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
var EventGenerator = require("./websocket-event-generator");


// listen to events and send data on websocket connection. 
var eventGenerator = new EventGenerator();
eventGenerator.on("someevent", function (event) {
  aWebSocketService.clients.forEach(function (client) {
  	console.log("Sent " + event + " to client");
    client.send('hello ' + event);
  });
})

// register a websocked endpoint
app.ws('/connect', function(ws, req) {
  console.log("Connection received");
});

// aWebSocketService is a view of all connections to an endpoint.
// Send a message to each registered client every second.
var aWebSocketService = expressWs.getWss('/connect');
 
app.listen(3000);