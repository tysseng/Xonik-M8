function getNetworkBySsid(ssid, nets){
  return new Promise(function(resolve, reject){  
    var selectedNet = findNetInList(ssid, nets);
    if(selectedNet){
      console.log("Found net");
      resolve(selectedNet);
    } else {
      console.log("Could not find net");
      reject({message: "Requested network is not available anymore, maybe it was turned off"});
    }
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

function findNetInList(ssid, nets){
  return _.find(nets, function(o) { return o.ssid === ssid});
}

module.exports.findNetInList=findNetInList;
module.exports.getNetworkBySsid=getNetworkBySsid;