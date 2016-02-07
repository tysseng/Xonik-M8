var config = require('../synthcore/config.js');
var jsonfile = require('jsonfile');
var _ = require('lodash');
var utils = require('./utils.js');

var knownNets = [];

function getAll(){
  return knownNets;
}

function add(net){
  if(!isInKnownNets(net)){
    console.log("Network " +net.ssid + " is not in list of known networks, adding it");
    addNetToKnown(net);
  }
}

function isInKnownNets(net){
  return utils.findNetInList(net.ssid, knownNets);
}

function addNetToKnown(net){
  knownNets.push({
    ssid: net.ssid,
    wpaParameters: net.wpaParameters
  });
  save(); 
}

function findNetInList(ssid, nets){
  return _.find(nets, function(o) { return o.ssid === ssid});
}

function save(){
  jsonfile.writeFile(config.wifi.files.persistedNets, knownNets, function(err){
    if(err){
      console.log("Error while persisting nets:");
      console.log(err);
    } else {
      console.log("Network list saved to disk");
    }
  });
}

function load(success){
  console.log("Going to load persisted networks");
  jsonfile.readFile(config.wifi.files.persistedNets, function(err, obj){
    if(err){
      console.log("Could not load persisted networks");
      console.log(err);
      knownNets = {};
    } else {
      knownNets = obj;
      console.log("Loaded persisted networks");
      console.log(knownNets);
      if(success) success();
    }
  });
}

load();

module.exports.add = add;
module.exports.getAll = getAll;
