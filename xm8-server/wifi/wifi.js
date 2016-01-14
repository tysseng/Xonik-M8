var execSync = require('child_process').execSync;
var exec = require('child_process').exec;

var detectedNets = [];

function connect(){
  console.log("Connecting to default networks");
  console.log("Bringing down wlan0"); 

  exec("ifconfig wlan0 down", function (error, stdout, stderr){
    //Do something if error
    console.log(stdout);

    console.log("Removing dhcp entry");
    exec("dhclient -r wlan0", function (error, stdout, stderr){
      console.log(stdout);

      console.log("Starting wpa_supplicant with default settings");
      exec("wpa_supplicant -B -Dwext -iwlan0 -c/etc/wpa_supplicant/wpa_supplicant.conf", function(error, stdout, stderr){
        console.log(stdout);
      });
    });
  });
}

function scan(){
  exec("iwlist wlan0 scan", function(error, stdout, stderr){
    // reset list of detected nets
    detectedNets = [];

    var nets = stdout.split("Cell");
    if(nets.length < 2){
      return;
    }

    for(var i = 1; i<nets.length; i++){ 
      var lines = nets[i].split("\n");
      
      var index = lines[0].match(/^\s*[0-9]+/g)[0].trim();
      var net = {
        Index: index
      }
      detectedNets.push(net);

      // remove index from first line
      lines[0] = lines[0].split(" - ")[1];

      // default number of indents, is used for detecting when an IE block ends
      var defaultIndent = lines[1].match(/^\s+/g);
      var ieBlock; //NOT internet explorer...
      var inIEBlock = false;

      for(var j = 0; j<lines.length; j++){
        var line = lines[j];

        var indentMatch = line.match(/^\s+/g);
        if(indentMatch){
          var indent = indentMatch[0].length;
        }
        line = line.trim();

        if(line.startsWith('Quality')){
          addSignalInfo(line, net);
        }

        var splitPos = line.search(":");
        if(splitPos > -1){
          var key = line.substr(0, splitPos).trim().replace(/\s/g, '_');
          var value = line.substr(splitPos + 1).trim().replace(/\"/g, '');
       
          // start new IE block if key is IE. 
          if(key === 'IE'){
            inIEBlock = true;
            ieBlock = {type: value}
            if(!net["IE"]){
              net["IE"] = [];
            } 
            net["IE"].push(ieBlock);
          } else {
            // detect when IE block ends.
            if(inIEBlock && indent === defaultIndent){
              inIEBlock = false; 
            }

            if(inIEBlock){
              ieBlock[key] = value;
            } else {
              net[key] = value;
            }
          }
        }
      }
    }
  console.log(detectedNets);
  });
}

function addSignalInfo(line, net){
  var parts = line.split('  ');

  for(var i = 0; i<parts.length; i++){
    var part = parts[i];
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
  }
}

function listNetworks(){
  exec("wpa_cli list_networks", function(error, stdout, sterr){
    console.log(stdout);
  });
}

//connect();
setTimeout(scan, 1000);
