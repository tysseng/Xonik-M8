var config = require('../config.js');
var jsonfile = require('jsonfile');
var _ = require('lodash');
var utils = require('./utils.js');

var knownNets = [];

function get(ssid){
  return utils.findNetInList(ssid, knownNets);
}

function list(){
  return knownNets;
}

function add(net){
  if(isInKnownNets(net)){
    replace(net);
  } else {
    console.log("Network " +net.ssid + " is not in list of known networks, adding it");
    addNetToKnown(net);
  }
}

function replace(net){
  for(var i = 0; i < knownNets.length; i++){
    if(knownNets[i].ssid === net.ssid){
      knownNets[i] = net;
      console.log("Replaced network " + net.ssid + " at position " + i);      
      save();
      return;
    }
  }  
}

function remove(ssid){
  for(var i = 0; i < knownNets.length; i++){
    if(knownNets[i].ssid === ssid){
      knownNets.splice(i, 1);
      save();
      return;
    }
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
module.exports.get = get;
module.exports.remove = remove;
module.exports.list = list;
