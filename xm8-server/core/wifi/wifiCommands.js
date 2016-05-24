var config = require('../../shared/config.js');
var pt = require('../promiseTools.js');

function shutdownAdapter(){
  return pt.exec(
    "ifconfig " + config.wifi.adapter + " down",
    "Bringing down " + config.wifi.adapter,
    "Could not shutdown " + config.wifi.adapter);
}

function removeDhcpEntry(){
  return pt.exec(
    "dhclient -r " + config.wifi.adapter,
    "Removing dhcp entry",
    "Could not remove dhcp entry");
}


// TODO: Merge these
function setWlanModeToManaged(){
  return pt.exec(
    "iwconfig " + config.wifi.adapter + " mode Managed",
    "Setting wlan mode to managed",
    "Could not set wlan mode to managed");
}

function startAdapter(){
  return pt.exec(
    "ifconfig " + config.wifi.adapter + " up", 
    "Bringing up adapter",    
    "Could not bring up adapter");
}

function generateDhcpEntry(){
  return pt.exec(
    "dhclient " + config.wifi.adapter,
    "Generating dhcp entry",
    "Could not generate dhcp entry");
}

function setWifiKey(key){
  return pt.exec(
    "iwconfig " + config.wifi.adapter + " key " + key,
    "Setting wifi key",    
    "Could not set wifi key");
}

function setWifiEssid(ssid){
  return pt.exec(  
    "iwconfig " + config.wifi.adapter + " essid " + ssid,
    "Setting wifi essid",
    "Could not set wifi essid");
}

function setWifiIp(ip, netmask){
  return pt.exec(
    "ifconfig " + config.wifi.adapter + " " + ip + " netmask " + netmask,
    "Setting wifi ip and netmask",    
    "Could not set wifi ip and netmask");
}


function runIfconfig(ssid){
  return pt.exec(
    "ifconfig",
    "Capturing ifconfig output",
    "Could not capture ifconfig output");
}

function scanForNetworks(){
  return pt.exec(
    "iwlist " + config.wifi.adapter + " scan",
    "Scanning for available wifi networks",
    "Could not scan for available wifi networks");
}

module.exports.shutdownAdapter = shutdownAdapter;
module.exports.removeDhcpEntry = removeDhcpEntry
module.exports.setWlanModeToManaged =setWlanModeToManaged; 
module.exports.startAdapter = startAdapter;
module.exports.generateDhcpEntry = generateDhcpEntry;
module.exports.setWifiKey = setWifiKey;
module.exports.setWifiEssid = setWifiEssid;
module.exports.setWifiIp = setWifiIp;
module.exports.runIfconfig = runIfconfig;
module.exports.scanForNetworks = scanForNetworks;

/**
Troubleshooting:

Etter restart så får man følgende feilmelding ved forsøk på å connecte til ad-hoc:
{
  "message": "Could not set wlan mode to ad-hoc",
  "stdout": "",
  "stderr": "Error for wireless request \"Set Mode\" (8B06) :\n    SET failed on device wlan0 ; Operation not permitted.\n",
  "error": {
    "killed": false,
    "code": 250,
    "signal": null,
    "cmd": "/bin/sh -c iwconfig wlan0 mode ad-hoc"
  }
}

Ved å kjøre følgende kommando:

wpa_supplicant -B -Dwext -iwlan0 -c/etc/wpa_supplicant/wpa_supplicant.conf

så løser det seg. Finn ut hvorfor!
*/

