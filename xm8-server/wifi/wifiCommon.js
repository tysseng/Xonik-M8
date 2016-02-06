var config = require('../synthcore/config.js');
var knownNets = require('./knownNets.js');
var display = require('../synthcore/display.js');

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


function acceptConnection(net, addToKnown){
  return new Promise(function(resolve, reject){    
  console.log("net");
  console.log(net);
    display.write(0, 0, "I'm at " + net.ip + " on " + net.ssid);   
    connectedNet = net;
    if(addToKnown){
      knownNets.add(net);
    }
    resolve(net);
  });
}

module.exports.findIP = findIP;
module.exports.acceptConnection = acceptConnection;
