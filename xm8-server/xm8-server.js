/*
Xonik M8 ws & http server

Go to http://pi_address/

TODO: Sanitize inputs
*/

var express = require('express');
var app = express();
var ws = require('express-ws')(app);
var bodyParser = require('body-parser');

var wifiRoutes = require('./routes/wifi');
var matrixRoutes = require('./routes/matrix');
var voiceRoutes = require('./routes/voice');
require('./routes/controller')(app, ws);

// for parsing application/json
app.use(bodyParser.json()); 

// static files location
app.use(express.static('static'));

// start page
app.get('/', function (req, res) {
  console.log("Redirecting to start page");
  res.redirect("/xm8-gui.html");
});

app.use('/wifi', wifiRoutes);
app.use('/matrix', matrixRoutes);
app.use('/voice', voiceRouters);

// Capture all requests not yet handled and redirect them to the captive portal
// page as they may origin from wifi logon.
// TODO: Seems to capture all ws calls too
/*app.use(function(req, res, next){
  console.log("User requested " + req.originalUrl + ", redirecting to captive portal page");
  res.redirect("/xm8-captive-portal.html");
});*/

app.listen(80);
