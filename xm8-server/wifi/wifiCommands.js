var config = require('../synthcore/config.js');
var pt = require('../synthcore/promiseTools.js');

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

function terminateWpaSupplicant(){
  return pt.exec(
    "wpa_cli terminate",
    "Terminating old wpa_supplicant instance",    
    "wpa_supplicant probably terminated, continuing",
    true); //ignore errors and continue
}

function deleteWpaLogfile(){
  return pt.exec(
    "rm -rf " + config.wifi.files.wpaLog,
    "Deleting wpa log file",    
    "Could not delete wpa log file");
}

function startWpaSupplicant(){
  return pt.exec(
    "wpa_supplicant -B -Dwext -i" + config.wifi.adapter + " -c" + config.wifi.files.wpaSupplicant + " -f" + config.wifi.files.wpaLog,
    "Starting wpa_supplicant",
    "Could not start wpa_supplicant");
}

// TODO: Merge these
function setWlanModeToManaged(){
  return pt.exec(
    "iwconfig " + config.wifi.adapter + " mode Managed",
    "Setting wlan mode to managed",
    "Could not set wlan mode to managed");
}

function setWlanModeToAdHoc(){
  return pt.exec(
    "iwconfig " + config.wifi.adapter + " mode ad-hoc",
    "Setting wlan mode to ad-hoc",
    "Could not set wlan mode to ad-hoc");
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

function getWpaCliStatus(){
  return pt.exec(
    "wpa_cli status",
    "Checking wpa cli status",
    "Checking wpa cli status failed");
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

function getWpaControlEvents(){
  return pt.exec(
    "grep 'CTRL-EVENT' "  + config.wifi.files.wpaLog,
    "Searching wpa log for control events",
    "Failed while searching wpa log for control events",
    true); 
}

module.exports.shutdownAdapter = shutdownAdapter;
module.exports.removeDhcpEntry = removeDhcpEntry
module.exports.terminateWpaSupplicant = terminateWpaSupplicant;
module.exports.deleteWpaLogfile = deleteWpaLogfile;
module.exports.startWpaSupplicant = startWpaSupplicant;
module.exports.setWlanModeToManaged =setWlanModeToManaged; 
module.exports.setWlanModeToAdHoc = setWlanModeToAdHoc;
module.exports.startAdapter = startAdapter;
module.exports.generateDhcpEntry = generateDhcpEntry;
module.exports.setWifiKey = setWifiKey;
module.exports.setWifiEssid = setWifiEssid;
module.exports.setWifiIp = setWifiIp;
module.exports.getWpaCliStatus = getWpaCliStatus;
module.exports.runIfconfig = runIfconfig;
module.exports.scanForNetworks = scanForNetworks;
module.exports.getWpaControlEvents = getWpaControlEvents;

