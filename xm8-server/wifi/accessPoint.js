// TODO: Check if hostapd is running before starting. Kill any running processes.

var config = require('../synthcore/config.js');
var wc = require('./wifiCommands.js');
var pt = require('../synthcore/promiseTools.js');
var utils = require('./utils.js');
var fs = require('fs');

function connect(state){
  state.connectedNet = undefined;

  var net = {ssid: config.wifi.accessPoint.ssid};

  return wc.setWifiIp(config.wifi.accessPoint.ip, config.wifi.accessPoint.netmask)
    .then(function(){
      state.connectionType = "accessPoint";
    })  
    .then(pt.delay.bind(null, 500))
    // we have to do this just in case, if hostapd is already running, several processes
    // will be started.
    .then(stopHostapd)       
    .then(wc.startAdapter)    
    .then(generateHostapdConf)
    .then(generateDnsmasqConf)
    .then(startDnsmasq)
    .then(startHostapd)
    .then(wc.runIfconfig)
    .then(utils.findIP)
    .then(function(foundIp){
      // store connected ip for later
      net.ip = foundIp;
      return net;
    });
}

function disconnect(){
  console.log("Disconnecting access point");
  return stopHostapd()
    .then(stopDnsmasq);
}

function generateHostapdConf(){

  var promise = new Promise(function(resolve, reject){
    var fileContent = 
      "interface=" + config.wifi.adapter + "\n" +
      "bridge=br0\n" +
      "ssid=" + config.wifi.accessPoint.ssid + "\n" +
      "channel=" + config.wifi.accessPoint.channel + "\n" + 
      "wpa=2\n" + 
      "wpa_passphrase=" + config.wifi.accessPoint.key + "\n" +
      "wpa_key_mgmt=WPA-PSK\n" + 
      "wpa_pairwise=TKIP\n" + 
      "rsn_pairwise=CCMP\n" + 
      "auth_algs=3\n" +
      "wmm_enabled=1\n" +
      "macaddr_acl=0";

    fs.writeFile(config.wifi.files.hostapdConf, fileContent, function(err) {
      if(err) {
        console.log(err);
        reject({message: "Could not generate hostapd.conf"});
      } else {
        console.log("hostapd.conf saved.");
        resolve();
      }
    });      
  });
  return promise;    
}

function generateDnsmasqConf(){

  var promise = new Promise(function(resolve, reject){
    var fileContent = 
      "interface=" + config.wifi.adapter + "\n" +
      "dhcp-range=" + config.wifi.dhcp.range;

    fs.writeFile(config.wifi.files.dnsmasqConf, fileContent, function(err) {
      if(err) {
        console.log(err);
        reject({message: "Could not generate dnsmasq.conf"});
      } else {
        console.log("dnsmasq.conf saved.");
        resolve();
      }
    });      
  });
  return promise;    
}

function startHostapd(){
  return pt.exec(
    "hostapd -B -d " + config.wifi.files.hostapdConf,
    "Starting access point (hostapd)",
    "Could not start access point");
}

function stopHostapd(){
  return pt.exec(
    "pkill hostapd",
    "Stopping access point (hostapd)",
    "Could not stop access point, maybe it wasn't running",
    true);
}

function startDnsmasq(){
  return pt.exec(
    "/etc/init.d/dnsmasq start",
    "Starting dhcp/dns (dnsmasq)",
    "Could not start dhcp/dns");  
}

function stopDnsmasq(){
  return pt.exec(
    "/etc/init.d/dnsmasq start",
    "Stoppint dhcp/dns (dnsmasq)",
    "Could not stop dhcp/dns");  
}

module.exports.connect = connect;
