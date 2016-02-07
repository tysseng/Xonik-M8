var wc = require('./wifiCommands.js');
var knownNets = require('./knownNets.js');
var _ = require('lodash');
var wifiUtils = require('./utils.js');

var detectedNets = [];

// lists all available networks along with their status.
function list(state){
  if(detectedNets.length == 0){
    console.log("no nets detected, doing a re-scan");    
    return wc.scanForNetworks()
      .then(extractNetworks)
      .then(mergeDetectedWithKnown.bind(null, state))
    // todo: merge with stored nets etc    
  } else {
    console.log("Networks already detected")
    return new Promise(function(resolve, reject){
      resolve(detectedNets);
    });
  }
}

function extractNetworks(stdout){
  return new Promise(function(resolve, reject){
    var nets = [];

    var netsAsText = stdout.split("Cell");
    if(netsAsText.length < 2){
      return;
    }

    // iterating in the normal way because we want to start on index 1.
    for(var i = 1; i<netsAsText.length; i++){ 
      var lines = netsAsText[i].split("\n");
      var index = lines[0].match(/^\s*[0-9]+/g)[0].trim();
      var detectedNet = {
        Index: index
      }
      nets.push(detectedNet);

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
       
          // we want to rename some of the keys, for example ESSID
          var key = replaceExtractedKey(key);

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

    // save globaly
    detectedNets = nets;

    resolve(nets);
  });  
}

function replaceExtractedKey(key){
  switch(key){
    case 'ESSID':
      return 'ssid';
    default:
      return key;
  }
}

function mergeDetectedWithKnown(state, detectedNets){
  return new Promise(function(resolve, reject){

    _.forEach(detectedNets, function(detectedNet){

      detectedNet.keysToInclude=['ssid', 'psk'];

      var knownNet = wifiUtils.findNetInList(detectedNet.ssid, knownNets.get());
      console.log(detectedNet.ssid);
      if(knownNet){
        detectedNet.isKnown = true;
        _.extend(detectedNet, knownNet);
      } 
      if(state.connectedNet && state.connectedNet.ssid === detectedNet.ssid){
        _.extend(detectedNet, state.connectedNet);
        detectedNet.isConnected = true;
      }
    });

    resolve(detectedNets);
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

module.exports.list = list;
