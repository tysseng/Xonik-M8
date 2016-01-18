var execSync = require('child_process').execSync;
var exec = require('child_process').exec;
var jsonfile = require('jsonfile');

var persistedNetsFile = 'persisted_nets.json';

var detectedNets = [];

var knownNets = {};

function connect(){
  console.log("Connecting to default networks");
  console.log("Bringing down wlan0"); 

  exec("ifconfig wlan0 down", function (error, stdout, stderr){
    //Do something if error
    console.log(stdout);

    console.log("Removing dhcp entry");
    exec("dhclient -r wlan0", function (error, stdout, stderr){
      console.log(stdout);

      try{
        execSync("wpa_cli terminate");
     } catch(err){
        console.log("wpa_supplicant probably terminated, continuing");
     }

      console.log("Starting wpa_supplicant with default settings");
      exec("wpa_supplicant -B -Dwext -iwlan0 -c/etc/wpa_supplicant/wpa_supplicant.conf", function(error, stdout, stderr){
        console.log(stdout);

        execSync("iwconfig wlan0 mode Managed");
        execSync("ifconfig wlan0 up");       
        execSync("dhclient wlan0");       
      });
    });
  });
}

function startAdHoc(){
  console.log("Starting Ad Hoc wifi network");
  console.log("Bringing down wlan0");

  exec("ifconfig wlan0 down", function (error, stdout, stderr){
    //Do something if error
    console.log(stdout);

    console.log("Removing dhcp entry");
    exec("dhclient -r wlan0", function (error, stdout, stderr){
      console.log(stdout);

      console.log("Trying to set up ad hoc network");
      try{
        execSync("wpa_cli terminate");
      } catch(err){
        console.log("wpa_supplicant probably terminated, continuing");
      }      
      execSync("iwconfig wlan0 mode ad-hoc");
      execSync("iwconfig wlan0 key abcdef123456");
      execSync("iwconfig wlan0 essid XM8");
      execSync("ifconfig wlan0 10.0.0.200 netmask 255.255.255.0");
      
      console.log("Bringing up wlan0");
      
      setTimeout(function(){ 
        exec("ifconfig wlan0 up", function(error, stdout, stderr){
          console.log(stdout);
          if(error){
            console.log(error);
            console.log(stderr);
          }
        });
      }, 500);
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

function loadPersistedNets(){
  jsonfile.readFile(persistedNetsFile, function(err, obj){
    if(err){
      persistedNets = {};
    } else {
      persistedNets = obj;
    }
    console.log(persistedNets);
  });
}

function persistNets(){
  jsonfile.writeFile(persistedNetsFile, knownNets, function(err){
    if(err){
      console.log("Error while persisting nets:");
      console.log(err);
    } else {
      console.log("Network list saved to disk");
    }
  });
}

function addNetToKnown(ssid, psk){
  knownNets[ssid] = {
    ssid: ssid,
    psk: psk
  }
  persistNets(); 
}

//connect();
startAdHoc(); 
//addNetToKnown("Mono", "jupiter8prophet5");
//setTimeout(loadPersistedNets, 1000);

/*
root@raspberrypi:~# iwconfig wlan0 mode managed 
Error for wireless request "Set Mode" (8B06) :
    SET failed on device wlan0 ; Operation not permitted.

løsning: starte wpa_supplicant, fjernet problemet
*/
