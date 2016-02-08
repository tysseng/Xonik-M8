var config = require('../synthcore/config.js');
var wc = require('./wifiCommands.js');
var utils = require('./utils.js');
var pt = require('../synthcore/promiseTools.js');


function connect(state){
  state.connectedNet = undefined;

  var net = {ssid: config.wifi.adHoc.ssid};
  
  return setWlanModeToAdHoc()
    .then(function(){
      state.connectionType = "adHoc";
    })  
    .then(wc.setWifiKey.bind(null, config.wifi.adHoc.key))
    .then(wc.setWifiEssid.bind(null, config.wifi.adHoc.ssid))
    .then(wc.setWifiIp.bind(null, config.wifi.adHoc.ip, config.wifi.adHoc.netmask))
    .then(pt.delay.bind(null, 500))
    .then(wc.startAdapter)
    .then(wc.runIfconfig)
    .then(utils.findIP)
    .then(function(foundIp){
      // store connected ip for later
      net.ip = foundIp;
      return net;
    });
}

function setWlanModeToAdHoc(){
  return pt.exec(
    "iwconfig " + config.wifi.adapter + " mode ad-hoc",
    "Setting wlan mode to ad-hoc",
    "Could not set wlan mode to ad-hoc");
}

module.exports.connect = connect;
