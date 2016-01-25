var execSync = require('child_process').execSync;
var exec = require('child_process').exec;
var jsonfile = require('jsonfile');
var fs = require('fs');
var display = require('../synthcore/display.js');
var _ = require('lodash');

var persistedNetsFile = 'wifi/persisted_nets.json';
var wpaSupplicantFile = '/etc/wpa_supplicant/wpa_supplicant.conf';

var detectedNets = [];

var knownNets = [];

function generateWpaSupplicantConf(nets, success){
  var fileContent = "ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev\n" +
    "fast_reauth=1\n" +
    "#Priority: Higher number seems to take presedence\n";

  for (var i = 0; i < nets.length; i++) {

    var net = nets[i];
    fileContent += 'network={\n';

    // keys to include for this particular network
    _.forEach(net.keysToInclude, function(key){
      var value = net[key];
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
    } else {
      console.log("Wpa supplicant config saved.");
      success();
    }
  });   
}

function isInKnownNets(net){
  return getNetBySsid(net.ssid, knownNets);
}

function selectNet(ssid, success, failure){
  var selectedNet = getNetBySsid(ssid, detectedNets);
  if(selectedNet){
    selectNetAndConnect(selectedNet, success, failure);
  } else {
    failure({message: "Requested network is not available anymore, maybe it was turned off"});
  }
}

function getNetBySsid(ssid, nets){
  return _.find(nets, function(o) { return o.ESSID === ssid});
}

function selectNetAndConnect(net, success, failure){
  generateWpaSupplicantConf([net], 
    function(){
      connect(
        function(connectedNet){
          display.write(0, 0, "I'm at " + connectedNet.ip + " on " + connectedNet.ssid );   
          addToKnownIfNew(connectedNet);
          success(connectedNet);
        }
      );
    }, 
    function(err){
      display.write(0, 0, "Could not connect to " + net.ssid);
      startAdHoc(); //todo - add failure here....
    }
  );
}

function addToKnownIfNew(net){
  if(!isInKnownNets(net)){
    console.log("Network " +net.ssid + " is not in list of known networks, adding it");
    addNetToKnown(net.ssid, net.psk);
  }
}

function connectToKnownNets(){
  generateWpaSupplicantConf(knownNets, connect, 
    function(connectedNet){
      display.write(0, 0, "I'm at " + connectedNet.ip + " on " + connectedNet.ssid );  
    },
    function(err){
      startAdHoc();
    });
}

function execAsPromise(command, logMsg, errorMsg){
   var promise = new Promise(function(resolve, reject){
    console.log(logMsg);
    exec(command, function (error, stdout, stderr){
      if(!error){
        console.log(stdout);
        resolve();
      } else {
        reject({message: errorMsg});
      }
    });
  });
  return promise; 
}

function shutdownAdapter(){
  return execAsPromise(
    "ifconfig wlan0 down",
    "Bringing down wlan0",
    "Could not shutdown wifi adapter");
}

function removeDhcpEntry(){
  return execAsPromise(
    "dhclient -r wlan0",
    "Removing dhcp entry",
    "Could not remove dhcp entry");
}

function terminateWpaSupplicant(){
  return execAsPromise(
    "wpa_cli terminate",
    "Terminating old wpa_supplicant instance",    
    "wpa_supplicant probably terminated, continuing");
}

function startWpaSupplicant(){
  return execAsPromise(
    "wpa_supplicant -B -Dwext -iwlan0 -c" + wpaSupplicantFile,
    "Starting wpa_supplicant",
    "Could not start wpa_supplicant");
}

// TODO: Merge these
function setWlanModeToManaged(){
  return execAsPromise(
    "iwconfig wlan0 mode Managed",
    "Setting wlan mode to managed",
    "Could not set wlan mode to managed");
}

function setWlanModeToAdHoc(){
  return execAsPromise(
    "iwconfig wlan0 mode ad-hoc",
    "Setting wlan mode to ad-hoc",
    "Could not set wlan mode to ad-hoc");
}

function startAdapter(){
  return execAsPromise(
    "ifconfig wlan0 up", 
    "Bringing up adapter",    
    "Could not bring up adapter");
}

function startAdapterDelayed(){
  var promise = new Promise(function(resolve, reject){
    console.log("Bringing up adapter");
    setTimeout(function(){
      exec("ifconfig wlan0 up", function (error, stdout, stderr){
        if(!error){
          console.log(stdout);
          resolve();
        } else {
          reject({message: "Could not bring up adapter"});
        }
      });
    }, 500);
  });
  return promise; 
}

function generateDhcpEntry(){
  return execAsPromise(
    "dhclient wlan0",
    "Generating dhcp entry",
    "Could not generate dhcp entry");
}

function setWifiKey(){
  return execAsPromise(
    "iwconfig wlan0 key abcdef123456",
    "Setting wifi key",    
    "Could not set wifi key");
}

function setWifiEssid(){
  return execAsPromise(  
    "iwconfig wlan0 essid XM8",
    "Setting wifi essid",
    "Could not set wifi essid");
}

function setWifiIp(){
  return execAsPromise(
    "ifconfig wlan0 10.0.0.200 netmask 255.255.255.0",
    "Setting wifi ip and netmask",    
    "Could not set wifi ip and netmask"
}

// TODO: Figure out how to use reject/catch
function connect(success, connectionError){
  console.log("Connecting to wifi using wpa_supplicant");
   
  shutdownAdapter()
    .then(removeDhcpEntry)
    .then(terminateWpaSupplicant)
    .then(startWpaSupplicant)
    .then(setWlanModeToManaged)
    .then(startAdapter)
    .then(generateDhcpEntry)
    .then(function(){
        //TODO: Get network from status, ip from ifconfig
        var connectedNet = {ssid: "someid", ip: "10.0.0.123"};
        success(connectedNet);      
    })
    .catch(connectionError);
}

function startAdHoc(){
  console.log("Starting Ad Hoc wifi network");

  shutdownAdapter()
    .then(removeDhcpEntry)
    .then(terminateWpaSupplicant)
    .then(setWlanModeToAdHoc)
    .then(setWifiKey)
    .then(setWifiEssid)
    .then(setWifiIp)
    .then(startAdapterDelayed)
    .then(function(){
        //TODO: Get network from status, ip from ifconfig
        var connectedNet = {ssid: "someid", ip: "10.0.0.123"};
        success(connectedNet);      
    })    
    .catch(connectionError);

}

function scan(success, error){
  exec("iwlist wlan0 scan", function(err, stdout, stderr){
    if(err){
      error(stderr);
    }

    // reset list of detected nets
    detectedNets = [];

    var nets = stdout.split("Cell");
    if(nets.length < 2){
      return;
    }

    // iterating in the normal way because we want to start on index 1.
    for(var i = 1; i<nets.length; i++){ 
      var lines = nets[i].split("\n");
      var index = lines[0].match(/^\s*[0-9]+/g)[0].trim();
      var detectedNet = {
        Index: index
      }
      detectedNets.push(detectedNet);

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

    success(detectedNets);
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

// lists all available networks along with their status.
function listNetworks(success, error){
  // todo: merge with stored nets etc
  scan( 
    function(selectedNets){
      _.forEach(detectedNets, function(detectedNet){

        detectedNet.keysToInclude=['ssid', 'psk'];

        var knownNet = getNetBySsid(detectedNet.ESSID, knownNets);
        console.log(detectedNet.ESSID);
        if(knownNet){
          detectedNet.isKnown = true;
          _.extend(detectedNet, knownNet);
        } 
      });

      success(selectedNets);
    }, error);

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

function addNetToKnown(ssid, psk){
  knownNets.push({
    keysToInclude: ['ssid', 'psk'], // keys to include when writing wpa_supplicant file
    ssid: '"' + ssid + '"', // for wpa_supplicant file
    ESSID: ssid, // for matching with detected networks
    psk: psk
  });
  persistNets(); 
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

module.exports.listNetworks = listNetworks;
module.exports.selectNet = selectNet;
module.exports.selectAdHoc = startAdHoc;
module.exports.connectToKnownNets = connectToKnownNets;
