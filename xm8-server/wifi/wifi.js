// TODO: Store mac, retry without if not available
// TODO: Get additional config from gui
// TODO: Merge multiple nets with same SSID, add mac to supplicant config
// TODO: Add "connected", ip etc to connected net
// TODO: Hente signalstyrke/status


// TODO: Feilmelding ved fallback kommer ikke ut

var display = require('../synthcore/display.js');
var _ = require('lodash');
var wc = require('./wifiCommands.js');
var adHoc = require('./adHoc.js');
var accessPoint = require('./accessPoint.js');
var wpa = require('./wpa.js');
var wpaParameters = require('./wpaSupplicantParams.js');
var knownNets = require('./knownNets.js');
var availableNets = require('./availableNets.js');
var utils = require('./utils.js');
var config = require('../synthcore/config.js');

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
    .catch(fallBack.bind(null, success, failure));
}

function connectToKnownNets(success, failure){
  resetState();

  disconnect()
    .then(availableNets.list.bind(null, state))
    .then(wpa.connect.bind(null, null, knownNets.list(), state))
    .then(acceptConnection.bind(null, success, false))
    .catch(fallBack.bind(null, success, failure));
}

// set up ad hoc network or access point as a fallback for normal service
function fallBack(success, failure, err){
  console.log(err);
  display.write(0, 0, "Could not connect to network, trying fallback");
  state.lastConnectionError = err;

  var fallback;
  if(config.wifi.fallback === "adHoc"){
    fallback = adHoc.connect;
  } else {
    fallback = accessPoint.connect;
  }


  disconnect()
    .then(fallback.bind(null, state))
    .then(acceptConnection.bind(null, success, false))
    .catch(rejectConnection.bind(null, failure));
}

// start ad hoc network as requested by user
function connectToAdHoc(success, failure){
  resetState();

  disconnect()
    .then(adHoc.connect.bind(null, state))
    .then(acceptConnection.bind(null, success, false))
    .catch(rejectConnection.bind(null, failure));
}

// start access point as requested by user
function connectToAccessPoint(success, failure){
  resetState();

  disconnect()
    .then(accessPoint.connect.bind(null, state))
    .then(acceptConnection.bind(null, success, false))
    .catch(rejectConnection.bind(null, failure));
}

function rejectConnection(failure, err){
  state.lastConnectionError = err;
  failure(state);  
}

function acceptConnection(success, addToKnown, net){
  var address = net.domain ? net.domain : net.ip;

  display.write(0, 0, "I'm at " + address + " on network " + net.ssid);   
  if(net.password){
    display.write(1, 0, "Password is " + net.password);       
  }

  state.connectedNet = net;
  if(addToKnown){
    knownNets.add(net);
  }
  success(state);
}

function disconnect(){
  // To prevent problems if in an unknown state, run all disconnect functions
  return wpa.disconnect()
    .then(accessPoint.disconnect());
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

function forgetNetwork(ssid, success, failure){
  knownNets.remove(ssid);
  availableNets.list(state)
    .then(success)
    .catch(failure); 
}

function updateNetwork(net, success, failure){
  wpa.validateWpaParameters(net.wpaParameters);
  knownNets.update(net);
  success();  
}

function getWpaParameters(){
  return wpaParameters.parameters;
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
module.exports.forgetNetwork = forgetNetwork;
module.exports.connectToNet = connectToNet;
module.exports.connectToAdHoc = connectToAdHoc;
module.exports.connectToAccessPoint = connectToAccessPoint;
module.exports.connectToKnownNets = connectToKnownNets;
module.exports.getLastConnectionError = getLastConnectionError;
module.exports.getConnectedNet = getConnectedNet;
module.exports.getWpaParameters = getWpaParameters;
module.exports.addNetwork = addNetwork;
