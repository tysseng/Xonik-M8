var wc = require('./wifiCommands.js');
var utils = require('./utils.js');
var config = require('../synthcore/config.js');
var pt = require('../synthcore/promiseTools.js');
var _ = require('lodash');

function connect(ssid, nets, state){

  var net = {};

  return wpa.generateConfig(nets)
    .then(deleteLog)
    .then(start)
    .then(wc.setWlanModeToManaged)
    .then(wc.startAdapter)

    // The connection check could have been done right after startWpaSupplicant, but 
    // it seems that connection to the wifi continues even after that command
    // returns. To save time, we execute the next commands before checing if we 
    // actually have a valid conncetion.
    .then(waitForConnection)
    .then(getStatus)
    .then(findSsid)
    .then(function(foundSsid){
      // store connected ssid for later
      net.ssid = foundSsid;
      return wc.generateDhcpEntry();
    })
    .then(wc.runIfconfig)
    .then(utils.findIP)
    .then(function(foundIp){
      // store connected ip for later
      net.ip = foundIp;
      return net;
    });
}

function disconnectWpa(){
  return wc.shutdownAdapter()
    .then(wc.removeDhcpEntry)
    .then(stop);
}

function generateConfig(nets){

  // it is possible to send a single net instead of an array. In that
  // case it must be converted to an array
  if( Object.prototype.toString.call( nets ) !== '[object Array]' ) {
    console.log("Looking for a single net, creating array");
    nets = [nets];
  } 
  
  var promise = new Promise(function(resolve, reject){
    var fileContent = 
      "ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev\n" +
      "fast_reauth=1\n" +
      "#Priority: Higher number seems to take presedence\n";

    for (var i = 0; i < nets.length; i++) {

      var net = nets[i];
      var wpaParameters = net.wpaParameters;

      console.log("wpa params");
      console.log(wpaParameters);

      fileContent += 'network={\n';

      // keys to include for this particular network
      _.forEach(wpaParameters, function(parameter){
        var key = parameter.key;
        var value = parameter.value;
        var escapedValue = escapeValueIfNecessary(key, value);
        console.log(key + ": " + value + " was replaced with " + escapedValue);
        fileContent +='  ' + key + '=' + escapedValue + '\n';
      });
   
      // default content to include for all nets 
      var priority = nets.length - i;
      fileContent +=
        '  scan_ssid=1\n' + // makes it possible to connect even if network ssid is not broadcast
        '  priority=' + priority + '\n' +
        '}\n';
    }

    fs.writeFile(config.wifi.files.wpaSupplicant, fileContent, function(err) {
      if(err) {
        console.log(err);
        reject({message: "Could not generate " + config.wifi.files.wpaSupplicant});
      } else {
        console.log("Wpa supplicant config saved.");
        resolve();
      }
    });      
  });
  return promise;    
}

function escapeValueIfNecessary(key, value){
  if(key === 'ssid' || key === 'psk'){
    return '"' + value + '"';
  } 
  return value;
}


function start(){
  return pt.exec(
    "wpa_supplicant -B -Dwext -i" + config.wifi.adapter + " -c" + config.wifi.files.wpaSupplicant + " -f" + config.wifi.files.wpaLog,
    "Starting wpa_supplicant",
    "Could not start wpa_supplicant");
}


function stop(){
  return pt.exec(
    "wpa_cli terminate",
    "Terminating old wpa_supplicant instance",    
    "wpa_supplicant probably terminated, continuing",
    true); //ignore errors and continue
}

function deleteLog(){
  return pt.exec(
    "rm -rf " + config.wifi.files.wpaLog,
    "Deleting wpa log file",    
    "Could not delete wpa log file");
}

function getStatus(){
  return pt.exec(
    "wpa_cli status",
    "Checking wpa cli status",
    "Checking wpa cli status failed");
}

function getControlEvents(){
  return pt.exec(
    "grep 'CTRL-EVENT' "  + config.wifi.files.wpaLog,
    "Searching wpa log for control events",
    "Failed while searching wpa log for control events",
    true); 
}

function waitForConnection(retry){  
  // first try doesn't count as retry, initialize with zero
  retry || (retry = 0);

  return wpa.getControlEvents()
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

module.exports.generateConfig = generateConfig;
module.exports.getControlEvents = getControlEvents;
module.exports.connect = connect;
