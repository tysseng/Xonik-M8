// TODO: Store mac, retry without if not available
// TODO: Get additional config from gui
// TODO: Merge multiple nets with same SSID, add mac to supplicant config

var exec = require('child_process').exec;
var jsonfile = require('jsonfile');
var fs = require('fs');
var display = require('../synthcore/display.js');
var _ = require('lodash');
var config = require('../synthcore/config.js');
var pt = require('../synthcore/promiseTools.js');
var wc = require('./wifiCommands.js');

var persistedNetsFile = 'wifi/persisted_nets.json';
var wpaSupplicantFile = '/etc/wpa_supplicant/wpa_supplicant.conf';
var wpaLogFile = '/tmp/wpa_supplicant.log';

var detectedNets = [];
var knownNets = [];

// stores the last error, makes it possible to retrieve errors when connecting
// to ad-hoc after connect failed
var lastConnectionError = undefined;

function getLastConnectionError(){
  return lastConnectionError;
}

function connectToNet(ssid, success, failure){
  lastConnectionError = undefined;
  listNetworks()
    .then(getNetworkBySsid.bind(null, ssid))
    .then(generateWpaSupplicantConf)
    .then(connect.bind(null, ssid))
    .then(success)
    .catch(function(err){
      lastConnectionError = err;
      console.log("Could not connect to network. Error is:");
      console.log(err);
      display.write(0, 0, "Could not connect to network, trying ad-hoc");
      connectToAdHoc(success.bind(null, err), failure);
    });
}

function connectToKnownNets(success, failure){
  lastConnectionError = undefined;
  listNetworks()
    .then(generateWpaSupplicantConf.bind(null, knownNets))
    .then(connect)
    .then(success)
    .catch(function(err){
      lastConnectionError = err;
      display.write(0, 0, "Could not connect to network, trying ad-hoc");
      connectToAdHoc(success.bind(null, err), failure);
    });  
}


function connectToAdHoc(success, failure){
  lastConnectionError = undefined;
  var connectedNet = {ssid: config.wifi.adHoc.ssid};
  
  wc.shutdownAdapter()
    .then(wc.removeDhcpEntry)
    .then(wc.terminateWpaSupplicant)
    .then(wc.setWlanModeToAdHoc)
    .then(wc.setWifiKey.bind(null, config.wifi.adHoc.key))
    .then(wc.setWifiEssid.bind(null, config.wifi.adHoc.ssid))
    .then(wc.setWifiIp.bind(null, config.wifi.adHoc.ip, config.wifi.adHoc.netmask))
    .then(pt.delay.bind(null, 500))
    .then(wc.startAdapter)
    .then(wc.runIfconfig)
    .then(findIP)
    .then(function(foundIp){
      // store connected ip for later
      connectedNet.ip = foundIp;
      return acceptConnection(connectedNet, false);
    })
    .then(success)
    .catch(function(err){
      lastConnectionError = err;
      failure(err);
    });
}

function connect(ssid){

    var connectedNet = {};

    return wc.shutdownAdapter()
      .then(wc.removeDhcpEntry)
      .then(wc.terminateWpaSupplicant)
      .then(wc.deleteWpaLogfile)
      .then(wc.startWpaSupplicant)
      .then(wc.setWlanModeToManaged)
      .then(wc.startAdapter)

      // The connection check could have been done right after startWpaSupplicant, but 
      // it seems that connection to the wifi continues even after that command
      // returns. To save time, we execute the next commands before checing if we 
      // actually have a valid conncetion.
      .then(waitForConnection)
      .then(wc.getWpaCliStatus)
      .then(findSsid)
      .then(function(foundSsid){
        // store connected ssid for later
        connectedNet.ssid = foundSsid;
        return wc.generateDhcpEntry();
      })
      .then(wc.runIfconfig)
      .then(findIP)
      .then(function(foundIp){
        // store connected ip for later
        connectedNet.ip = foundIp;
        return acceptConnection(connectedNet, true);
      });
}

function acceptConnection(connectedNet, addToKnown){
  return new Promise(function(resolve, reject){    
    display.write(0, 0, "I'm at " + connectedNet.ip + " on " + connectedNet.ssid);   
    if(addToKnown){
      addToKnownIfNew(connectedNet);
    }
    resolve(connectedNet);
  });
}

function addToKnownIfNew(net){
  if(!isInKnownNets(net)){
    console.log("Network " +net.ssid + " is not in list of known networks, adding it");
    addNetToKnown(net.ssid, net.psk);
  }
}

function isInKnownNets(net){
  return findNetInList(net.ssid, knownNets);
}

function addNetToKnown(ssid, psk){
  knownNets.push({
    keysToInclude: ['ssid', 'psk'], // keys to include when writing wpa_supplicant file
    ssid: ssid, 
    psk: psk
  });
  persistNets(); 
}

function persistNets(){
  jsonfile.writeFile(persistedNetsFile, knownNets, function(err){
    if(err){
      console.log("Error while persisting nets:");
      console.log(err);
    } else {
      console.log("Network list saved to disk");
    }
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

  return wc.getWpaCliStatus()
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

  return wc.getWpaControlEvents()
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

function findIP(stdout){
  var promise = new Promise(function(resolve, reject){
    if(stdout){
      var blockStart = stdout.search(config.wifi.adapter);
      if(blockStart > -1){
        var block = stdout.substr(blockStart);

        // find first ip after block start
        var searchResult = /^\s+inet addr:([0-9\.]+).*$/gm.exec(block);
        if(searchResult && searchResult.length > 1){
          console.log("Found IP " + searchResult[1]);
          resolve(searchResult[1]);
          return;
        }
      }
    }
    console.log("No IP address found");
    reject({message: "No IP address found"})   
  });
  return promise;
}

function generateWpaSupplicantConf(nets){

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
      fileContent += 'network={\n';

      // keys to include for this particular network
      _.forEach(net.keysToInclude, function(key){
        // TODO: CHECK EXCISTENCE OF KEY HERE.
        var value = escapeValueIfNecessary(key, net[key]);
        console.log(key + ": " + net[key] + " was replaced with " + value);
        fileContent +='  ' + key + '=' + value + '\n';
      });
   
      // default content to include for all nets 
      var priority = nets.length - i;
      fileContent +=
        '  scan_ssid=1\n' + // makes it possible to connect even if network ssid is not broadcast
        '  priority=' + priority + '\n' +
        '}\n';
    }

    fs.writeFile(wpaSupplicantFile, fileContent, function(err) {
      if(err) {
        console.log(err);
        reject({message: "Could not generate wpa_supplicant.conf"});
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

// lists all available networks along with their status.
function listNetworks(){
  if(detectedNets.length == 0){
    console.log("no nets detected, doing a re-scan");    
    return wc.scanForNetworks()
      .then(extractNetworks)
      .then(mergeDetectedWithKnown)
    // todo: merge with stored nets etc    
  } else {
    console.log("Networks already detected")
    return new Promise(function(resolve, reject){
      resolve(detectedNets);
    });
  }
}

function extractNetworks(stdout){
  return new Promise(function(resolve, reject){
    var nets = [];

    var netsAsText = stdout.split("Cell");
    if(netsAsText.length < 2){
      return;
    }

    // iterating in the normal way because we want to start on index 1.
    for(var i = 1; i<netsAsText.length; i++){ 
      var lines = netsAsText[i].split("\n");
      var index = lines[0].match(/^\s*[0-9]+/g)[0].trim();
      var detectedNet = {
        Index: index
      }
      nets.push(detectedNet);

      // remove index from first line
      lines[0] = lines[0].split(" - ")[1];

      // default number of indents, is used for detecting when an IE block ends
      var defaultIndent = lines[1].match(/^\s+/g);
      var ieBlock; // NOT internet explorer but some wifi stuff
      var inIEBlock = false;

      _.forEach(lines, function(line){

        var indentMatch = line.match(/^\s+/g);
        if(indentMatch){
          var indent = indentMatch[0].length;
        }
        line = line.trim();

        if(line.startsWith('Quality')){
          addSignalInfo(line, detectedNet);
        }

        var splitPos = line.search(":");
        if(splitPos > -1){
          var key = line.substr(0, splitPos).trim().replace(/\s/g, '_');
          var value = line.substr(splitPos + 1).trim().replace(/\"/g, '');
       
          // we want to rename some of the keys, for example ESSID
          var key = replaceExtractedKey(key);

          // start new IE block if key is IE. 
          if(key === 'IE'){
            inIEBlock = true;
            ieBlock = {type: value}
            if(!detectedNet["IE"]){
              detectedNet["IE"] = [];
            } 
            detectedNet["IE"].push(ieBlock);
          } else {
            // detect when IE block ends.
            if(inIEBlock && indent === defaultIndent){
              inIEBlock = false; 
            }

            if(inIEBlock){
              ieBlock[key] = value;
            } else {
              detectedNet[key] = value;
            }
          }
        }
      });
    };

    // save globaly
    detectedNets = nets;

    resolve(nets);
  });  
}

function replaceExtractedKey(key){
  switch(key){
    case 'ESSID':
      return 'ssid';
    default:
      return key;
  }
}

function mergeDetectedWithKnown(detectedNets){
  return new Promise(function(resolve, reject){
    _.forEach(detectedNets, function(detectedNet){

      detectedNet.keysToInclude=['ssid', 'psk'];

      var knownNet = findNetInList(detectedNet.ssid, knownNets);
      console.log(detectedNet.ssid);
      if(knownNet){
        detectedNet.isKnown = true;
        _.extend(detectedNet, knownNet);
      } 
    });

    resolve(detectedNets);
  });
}

function getDetectedNets(){
  return new Promise(function(resolve, reject){
    if(detectedNets.length == 0){
      return listNetworks()
    }
  });
}

function addSignalInfo(line, net){

  _.forEach(line.split('  '), function(part){

    if(part.search(":") > -1 ){
      var keyVal = part.split(":");
    } else if (part.search("=") > -1){
      var keyVal = part.split("=");
    }

    var key = keyVal[0].replace(/\s/g,'_');
    var value = keyVal[1];
    if(value.search("/") > -1){
      value = value.split("/")[0].trim();
    }
    net[key] = value; 
  });
}

function loadPersistedNets(success){
  console.log("Going to load persisted networks");
  jsonfile.readFile(persistedNetsFile, function(err, obj){
    if(err){
      console.log("Could not load persisted networks");
      console.log(err);
      knownNets = {};
    } else {
      knownNets = obj;
      console.log("Loaded persisted networks");
      console.log(knownNets);
      if(success) success();
    }
  });
}

/*
function debugCreateNetworks(){
  addNetToKnown('"Poly"', '"jupiter8prophet5"');
  addNetToKnown('"Mono"', '"prophet5jupiter8"');
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

function debugRun(){

  // load all known nets from disk - has to be done elsewhere later
  loadPersistedNets(debugExecuteCommand);
}

debugRun();
*/

loadPersistedNets();
/*
root@raspberrypi:~# iwconfig wlan0 mode managed 
Error for wireless request "Set Mode" (8B06) :
    SET failed on device wlan0 ; Operation not permitted.

løsning: starte wpa_supplicant, fjernet problemet
*/

function getAvailableNetworks(success, failure){
 listNetworks()
   .then(success)
   .catch(failure); 
}

module.exports.getAvailableNetworks = getAvailableNetworks;
module.exports.connectToNet = connectToNet;
module.exports.connectToAdHoc = connectToAdHoc;
module.exports.connectToKnownNets = connectToKnownNets;
module.exports.getLastConnectionError = getLastConnectionError;
