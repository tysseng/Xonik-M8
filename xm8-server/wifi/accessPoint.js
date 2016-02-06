var config = require('../synthcore/config.js');
var wc = require('./wifiCommands.js');
var pt = require('../synthcore/promiseTools.js');
var common = require('./wifiCommon.js');

function startAccessPoint(){
  return wc.shutdownAdapter()
    .then(wc.removeDhcpEntry)
    .then(wc.terminateWpaSupplicant)
    .then(wc.setWifiIp.bind(null, config.wifi.accessPoint.ip, config.wifi.accessPoint.netmask))
    .then(pt.delay.bind(null, 500))
    .then(wc.startAdapter)    
    .then(generateHostapdConf
    .then(generateDnsmasqConf)
    .then(startDnsmasq)
    .then(startHostapd)
    .then(common.findIP)
    .then(function(foundIp){
      // store connected ip for later
      net.ip = foundIp;
      return acceptConnection(net, false);
    })
    .then(success)
    .catch(function(err){
      lastConnectionError = err;
      failure(err);
    });    
}

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
      net.ip = foundIp;
      return acceptConnection(net, false);
    })
    .then(success)
    .catch(function(err){
      lastConnectionError = err;
      failure(err);
    });

function generateHostapdConf(){

  var promise = new Promise(function(resolve, reject){
    var fileContent = 
      "interface=" + config.wifi.adapter + "\n" +
      "bridge=br0\n" +
      "ssid=" + config.wifi.accessPoint.ssid + "\n" +
      "channel=" + config.wifi.accessPoint.channel + "\n" + 
      "wpa=1\n" + 
      "wpa_passphrase=" + config.wifi.accessPoint.key + "\n" +
      "wpa_key_mgmt=WPA-PSK\n" + 
      "wpa_pairwise=TKIP\n" + 
      "rsn_pairwise=CCMP\n" + 
      "auth_algs=1\n" +
      "macaddr_acl=0"

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

function generateDnsmasqConf()){

  var promise = new Promise(function(resolve, reject){
    var fileContent = 
      "interface=" + config.wifi.adapter + "\n" +
      "dhcp-range=" + config.wifi.dhcp.range

    fs.writeFile(config.wifi.files.dnsmasq.conf, fileContent, function(err) {
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
    "hostapd -B -P " + config.wifi.files.hostapdPid + " -d " + config.wifi.files.hostapdConf,
    "Starting access point (hostapd)",
    "Could not start access point");
}

function stopHostapd(){
  return pt.exec(
    "kill -9 $(cat " + config.wifi.files.hostapdPid + ")",
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