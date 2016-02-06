// TODO: Store mac, retry without if not available
// TODO: Get additional config from gui
// TODO: Merge multiple nets with same SSID, add mac to supplicant config
// TODO: Add "connected", ip etc to connected net

var exec = require('child_process').exec;
var fs = require('fs');
var display = require('../synthcore/display.js');
var _ = require('lodash');
var config = require('../synthcore/config.js');
var pt = require('../synthcore/promiseTools.js');
var wc = require('./wifiCommands.js');
var common = require('./wifiCommon.js');
var adHoc = require('./adHoc.js');
var wpa = require('./wpaSupplicant.js');
var wpaParameters = require('./wpaSupplicantParams.js');
var knownNets = require('./knownNets.js');
var availableNets = require('./availableNets.js');

var connectedNet;

// stores the last error, makes it possible to retrieve errors when connecting
// to ad-hoc after connect failed
var lastConnectionError;

function connectToNet(ssid, success, failure){
  lastConnectionError = undefined;
  connectedNet = undefined;

  availableNets.list()
    .then(getNetworkBySsid.bind(null, ssid))
    .then(wpa.generateWpaSupplicantConf)
    .then(connect.bind(null, ssid))
    .then(success.bind(null, undefined)) // no error but necessary to have a first parameter
    .catch(function(err){
      lastConnectionError = err;
      console.log("Could not connect to network. Error is:");
      console.log(err);
      display.write(0, 0, "Could not connect to network, trying ad-hoc");
      adHoc.connectToAdHoc(success.bind(null, err), failure, true);
    });
}

function connectToKnownNets(success, failure){
  lastConnectionError = undefined;
  connectedNet = undefined;

  availableNets.list()
    .then(wpa.generateWpaSupplicantConf.bind(null, knownNets.get()))
    .then(connect)
    .then(success.bind(null, undefined)) // no error but necessary to have a first parameter
    .catch(function(err){
      lastConnectionError = err;
      display.write(0, 0, "Could not connect to network, trying ad-hoc");
      adHoc.connectToAdHoc(success.bind(null, err), failure, true);
    });  
}

function connectToAdHoc(success, failure, isFallback){
  return adHoc.connectToAdHoc(success, failure, isFallback);
}

function connect(ssid){

    var net = {};

    return wc.shutdownAdapter()
      .then(wc.removeDhcpEntry)
      .then(wpa.stopWpaSupplicant)
      .then(wpa.deleteWpaLogfile)
      .then(wpa.startWpaSupplicant)
      .then(wc.setWlanModeToManaged)
      .then(wc.startAdapter)

      // The connection check could have been done right after startWpaSupplicant, but 
      // it seems that connection to the wifi continues even after that command
      // returns. To save time, we execute the next commands before checing if we 
      // actually have a valid conncetion.
      .then(waitForConnection)
      .then(wpa.getWpaCliStatus)
      .then(findSsid)
      .then(function(foundSsid){
        // store connected ssid for later
        net.ssid = foundSsid;
        return wc.generateDhcpEntry();
      })
      .then(wc.runIfconfig)
      .then(common.findIP)
      .then(function(foundIp){
        // store connected ip for later
        net.ip = foundIp;
        return common.acceptConnection(net, true);
      });
}


// checkSsid will return positive if no expeced ssid.
function checkSsid(expectedssid, ssid){
  return new Promise(function(resolve, reject){    
    if(expectedssid === ssid || !expectedssid){
      console.log("Found correct ssid: " + ssid);
      resolve(ssid);
    } else {
      console.log("Connected to the wrong ssid: " + ssid);
      reject({message: "Connected to wrong ssid"});
    }
  });
}

function waitForSsid(ssid, retry) {
  // first try doesn't count as retry, initialize with zero
  retry || (retry = 0);

  return wpa.getWpaCliStatus()
    .then(findSsid)
    .catch(function (err) {
      if (retry >= config.wifi.connectionRetry.max){
        console.log("checking failed");
        throw err;
      }
      // wait some time and try again
      return pt.delay(config.wifi.connectionRetry.delayMs).then(waitForSsid.bind(null, ssid, ++retry));
    });
}

function waitForConnection(retry){  
  // first try doesn't count as retry, initialize with zero
  retry || (retry = 0);

  return wpa.getWpaControlEvents()
    .then(checkForConnection)
    .catch(function(controlEvents){
      if (retry >= config.wifi.connectionRetry.max){
        var reasons = extractReasons(controlEvents);
        throw {message: 'Connection timed out', reasons: reasons};        
      }
      if(controlEvents){       
        if(hasConnectionFailed(controlEvents)){
          var reasons = extractReasons(controlEvents);
          throw {message: 'Connection failed', reasons: reasons};
        }
      }
      // wait some time and try again
      return pt.delay(config.wifi.connectionRetry.delayMs).then(waitForConnection.bind(null, ++retry));      
    });
}

function hasConnectionFailed(controlEvents){
  return _.find(controlEvents, function(o) { return o.search('CONN_FAILED') > -1 });  
}

function extractReasons(controlEvents){
  var tempDisabledEvents = _.find(controlEvents, function(o) { return o.search('SSID-TEMP-DISABLED') > -1 });
  // TODO: Extract and uniquify reason from here
  return tempDisabledEvents;
}

function checkForConnection(controlEvents){
  if(controlEvents) {
    controlEvents = controlEvents.split('\n');
  }
  return new Promise(function(resolve, reject){    
    if(isConnected(controlEvents)){
      resolve();
    } else {
      reject(controlEvents);
    }
  });
}

function isConnected(controlEvents){

  return _.find(controlEvents, function(o) { return o.search('CTRL-EVENT-CONNECTED') > -1 });  
}

function findSsid(stdout){
  return new Promise(function(resolve, reject){
    if(stdout){
      // find first ip after block start
      var searchResult = /^ssid=(.*)$/gm.exec(stdout);
      if(searchResult && searchResult.length > 1){
        console.log("Found ssid: " + searchResult[1]);
        resolve(searchResult[1]);
        return;
      }
    }
    console.log("No ssid found");
    reject({message: "No ssid found"});
  });
}

function getNetworkBySsid(ssid, detectedNets){
  return new Promise(function(resolve, reject){  
    var selectedNet = findNetInList(ssid, detectedNets);
    if(selectedNet){
      console.log("Found net");
      resolve(selectedNet);
    } else {
      console.log("Could not find net");
      reject({message: "Requested network is not available anymore, maybe it was turned off"});
    }
  });
}

function findNetInList(ssid, nets){
  return _.find(nets, function(o) { return o.ssid === ssid});
}

function getConnectedNet(){
  return connectedNet;
}

function getLastConnectionError(){
  return lastConnectionError;
}


/*
root@raspberrypi:~# iwconfig wlan0 mode managed 
Error for wireless request "Set Mode" (8B06) :
    SET failed on device wlan0 ; Operation not permitted.

løsning: starte wpa_supplicant, fjernet problemet
*/

function getAvailableNetworks(success, failure){
 availableNets.list()
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

  var knownNet = findNetInList(ssid, knownNets.get());
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
