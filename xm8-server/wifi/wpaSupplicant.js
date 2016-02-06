var config = require('../synthcore/config.js');
var pt = require('../synthcore/promiseTools.js');
var _ = require('lodash');


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


function startWpaSupplicant(){
  return pt.exec(
    "wpa_supplicant -B -Dwext -i" + config.wifi.adapter + " -c" + config.wifi.files.wpaSupplicant + " -f" + config.wifi.files.wpaLog,
    "Starting wpa_supplicant",
    "Could not start wpa_supplicant");
}


function stopWpaSupplicant(){
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

function getWpaCliStatus(){
  return pt.exec(
    "wpa_cli status",
    "Checking wpa cli status",
    "Checking wpa cli status failed");
}

function getWpaControlEvents(){
  return pt.exec(
    "grep 'CTRL-EVENT' "  + config.wifi.files.wpaLog,
    "Searching wpa log for control events",
    "Failed while searching wpa log for control events",
    true); 
}
module.exports.generateWpaSupplicantConf = generateWpaSupplicantConf;
module.exports.getWpaControlEvents = getWpaControlEvents;
module.exports.getWpaCliStatus = getWpaCliStatus;
module.exports.stopWpaSupplicant = stopWpaSupplicant;
module.exports.deleteWpaLogfile = deleteWpaLogfile;
module.exports.startWpaSupplicant = startWpaSupplicant;
