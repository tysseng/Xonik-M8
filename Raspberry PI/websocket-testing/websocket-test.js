/*
Web socket example. See test.html for client side.
Client connects to ws://localhost:3000/connect and starts by sending a message that
is logged by the server.

The server sends messages back to any client registered to the ws endpoint on a regular
basis. Whenever a client disconnects (navigates away), message sends to that client ends.
*/

var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
 
app.use(function (req, res, next) {
  console.log('middleware');
  req.testing = 'testing';
  return next();
});

// register a websocked endpoint
app.ws('/connect', function(ws, req) {/*
  ws.on('message', function(msg) {
  	//logs connection and sends a welcome message. ("i.e. initial state")
    console.log("Received: " + msg);
    ws.send('Hello World!');
  });*/
  console.log('socket', req.testing);
});

var i = 0;

// aWebSocketService is a view of all connections to an endpoint.
// Send a message to each registered client every second.
var aWebSocketService = expressWs.getWss('/connect');
setInterval(function () {
  aWebSocketService.clients.forEach(function (client) {
  	console.log("Sent " + i + " to client");
    client.send('hello ' + i);
  });
  i++;
}, 10);
 
app.listen(3000);