/*
Xonik M8 ws & http server

Go to http://pi_address/
*/

var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
 
app.use(function (req, res, next) {
  console.log('middleware accessed through ' + req);
  req.testing = 'testing';
  return next();
});

app.use(express.static('static'));

app.get('/', function (req, res) {
  console.log("Redirecting to start page");
  res.redirect("/xm8-gui.html");
});

app.ws('/echo', function(ws, req) {
  console.log("Connection");

  ws.on('message', function(msg) {
    console.log("message received");
    var aWebSocketService = expressWs.getWss('/echo');
    aWebSocketService.clients.forEach(function (client) {
      try{
        console.log("Resending " + msg);
        client.send(msg);
      } catch (ex){
        console.log("Client not available");
      }
    });    
  });
});
 
app.listen(3000);
