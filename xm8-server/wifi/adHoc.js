var config = require('../synthcore/config.js');
var wc = require('./wifiCommands.js');
var wpa = require('./wpaSupplicant.js');
var common = require('./wifiCommon.js');
var pt = require('../synthcore/promiseTools.js');


function connectToAdHoc(success, failure, isFallback){
  connectedNet = undefined;

  // we do not want to reset the previous error if ad hoc connection is
  // the fallback of a connection attempt to a "normal" network. 
  if(!isFallback){ 
    lastConnectionError = undefined;
  }

  var net = {ssid: config.wifi.adHoc.ssid};
  
  wc.shutdownAdapter()
    .then(wc.removeDhcpEntry)
    .then(wpa.stopWpaSupplicant)
    .then(setWlanModeToAdHoc)
    .then(wc.setWifiKey.bind(null, config.wifi.adHoc.key))
    .then(wc.setWifiEssid.bind(null, config.wifi.adHoc.ssid))
    .then(wc.setWifiIp.bind(null, config.wifi.adHoc.ip, config.wifi.adHoc.netmask))
    .then(pt.delay.bind(null, 500))
    .then(wc.startAdapter)
    .then(wc.runIfconfig)
    .then(common.findIP)
    .then(function(foundIp){
      // store connected ip for later
      net.ip = foundIp;
      return common.acceptConnection(net, false);
    })
    .then(success)
    .catch(function(err){
      lastConnectionError = err;
      failure(err);
    });
}

function setWlanModeToAdHoc(){
  return pt.exec(
    "iwconfig " + config.wifi.adapter + " mode ad-hoc",
    "Setting wlan mode to ad-hoc",
    "Could not set wlan mode to ad-hoc");
}

module.exports.connectToAdHoc = connectToAdHoc;