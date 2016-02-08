// TODO: Store mac, retry without if not available
// TODO: Get additional config from gui
// TODO: Merge multiple nets with same SSID, add mac to supplicant config
// TODO: Add "connected", ip etc to connected net
// TODO: Hente signalstyrke/status

var display = require('../synthcore/display.js');
var _ = require('lodash');
var wc = require('./wifiCommands.js');
var adHoc = require('./adHoc.js');
var wpa = require('./wpa.js');
var wpaParameters = require('./wpaSupplicantParams.js');
var knownNets = require('./knownNets.js');
var availableNets = require('./availableNets.js');
var utils = require('./utils.js');

var state = {
  connectedNet: undefined,
  connectionType: undefined,

  // stores the last error, makes it possible to retrieve errors when connecting
  // to ad-hoc after connect failed
  lastConnectionError: undefined
}

function resetState(){
  state.connectedNet = undefined;
  state.connectionType = undefined;
  state.lastConnectionError = undefined;
}

function connectToNet(ssid, success, failure){
  resetState();

  disconnect()
    .then(availableNets.list.bind(null, state))
    .then(utils.getNetworkBySsid.bind(null, ssid))
    .then(function(net){
      return wpa.connect(ssid, [net], state);
    })
    .then(acceptConnection.bind(null, success, true))
    .catch(fallBackToAdHoc.bind(null, success, failure));
}

function connectToKnownNets(success, failure){
  resetState();

  disconnect()
    .then(availableNets.list.bind(null, state))
    .then(wpa.connect.bind(null, null, knownNets.get(), state))
    .then(acceptConnection.bind(null, success, false))
    .catch(fallBackToAdHoc.bind(null, success, failure));
}

// connect to ad hoc as a fallback for normal service
function fallBackToAdHoc(success, failure, err){
  console.log(err);
  display.write(0, 0, "Could not connect to network, trying ad-hoc");
  state.lastConnectionError = err;
  disconnect()
    .then(adHoc.connect.bind(null, state))
    .then(acceptConnection.bind(null, success, false))
    .catch(rejectConnection.bind(null, failure));
}

// connect to ad hoc as requested by user
function connectToAdHoc(success, failure){
  resetState();

  disconnect()
    .then(adHoc.connect.bind(null, state))
    .then(acceptConnection.bind(null, success, false))
    .catch(rejectConnection.bind(null, failure));
}

function rejectConnection(failure, err){
  state.lastConnectionError = err;
  failure(state);  
}

function acceptConnection(success, addToKnown, net){
  display.write(0, 0, "I'm at " + net.ip + " on " + net.ssid);   
  state.connectedNet = net;
  if(addToKnown){
    knownNets.add(net);
  }
  success(state);
}

function disconnect(){
  //TODO switch on current connection mode here
  return wpa.disconnect();
}

function getConnectedNet(){
  return state.connectedNet;
}

function getLastConnectionError(){
  return state.lastConnectionError;
}



//root@raspberrypi:~# iwconfig wlan0 mode managed 
//Error for wireless request "Set Mode" (8B06) :
//    SET failed on device wlan0 ; Operation not permitted.
//
//løsning: starte wpa_supplicant, fjernet problemet


function getAvailableNetworks(success, failure){
  availableNets.list(state)
    .then(success)
    .catch(failure); 
}

function getWpaParameters(){
  return wpaParameters.parameters;
}

function setWpaParameters(ssid, wpaParameters, success, failure){
  _.each(wpaParameters, function(parameter){
    if(!wpa.parameters[parameter.key]){
      failure({message: "No such wpa parameter exists"});
      return;
    }

    if(!typeof parameter.value === "string"){
      failure({message: "Input parameter " + parameter.key + "must be a string"}); 
      return;
    };
  });

  var knownNet = utils.findNetInList(ssid, knownNets.get());
  if(knownNet){
    // TODO: update through function in knownNets
    knownNet.wpaParameters.extend(wpaParameters);
  } else {
    knownNets.add({
      ssid: ssid,
      wpaParameters: wpaParameters
    });
  }

  // TODO: update through function in knownNets
  persistNets();
  console.log("Updated known nets");
  console.log(knownNets);

  success();  
}

function debugCreateNetworks(){

  var poly = {
    ssid: "Poly",
    wpaParameters: [
      {
        key: "ssid",
        value: "Poly"
      },
      {
        key: "psk",
        value: "jupiter8prophet5"
      }    
    ]
  }

  var mono = {
    ssid: "Mono",
    wpaParameters: [
      {
        key: "ssid",
        value: "Mono"
      },
      {
        key: "psk",
        value: "prophet5jupiter8"
      }    
    ]
  }

  addNetToKnown(poly);
  addNetToKnown(mono);
}

function debugExecuteCommand(){
  var cmd;

  // print process.argv
  process.argv.forEach(function (val, index, array) {
    if(index == 2) cmd = val;
  });

  if(cmd == "1"){
    selectNetAndConnect(knownNets[0]);
  } else if(cmd == "2"){
    selectNetAndConnect(knownNets[1]);
  } else if(cmd == "3"){
    connectToKnownNets();
  } else if(cmd == "4"){
    startAdHoc();
  } else if(cmd == "create"){
    debugCreateNetworks();
  }
}


debugExecuteCommand();

module.exports.getAvailableNetworks = getAvailableNetworks;
module.exports.connectToNet = connectToNet;
module.exports.connectToAdHoc = connectToAdHoc;
module.exports.connectToKnownNets = connectToKnownNets;
module.exports.getLastConnectionError = getLastConnectionError;
module.exports.getConnectedNet = getConnectedNet;
module.exports.getWpaParameters = getWpaParameters;
module.exports.setWpaParameters = setWpaParameters;
