// TODO: Graphical key split/voice assign - slide position for split and click on section to configure
// on configure: select existing group or add new
// voice group
// TODO: Save/load group configs - as 

var config = require('../../shared/config.js');
var _ = require('lodash');

var voices = [];
var groups = [];
var globalTuning = 0;
var allAreTuneable = true;
var currentGroup;

//TODO: find first available id instead of sending as param
function createGroup(id){
  groups[id] = {
    id: id,
    name: "Group " + id,
    keyboard: {
      // for keyboard split - start and end key on the keyboard
      start: 0,
      end: 60,
      shift: 0, // number of semitones to shift up/down

      // this allows multiple groups to be affected by these common controllers
      affectedByPitchBend: true, // midi pitch bend will still work independently of this setting
      affectedByModWheel: true,  // midi modulation will still work independently of this setting
      affectedByFootController: true  // midi foot controller will still work independently of this setting
    },
    midi: {
      channel: 0,
      controllerToInputMap: [], // what midi CCs are mapped to what input positions
      controllerHiRes: [] // what midi CCs are high res
    },
    graph: {
      //TODO: Add graph here
    },
    voices: [];      
  };
}

// Use this to change multiple parameters simultaneously
function updateGroup(id, groupUpdates){
  _.assign(groups[id], groupUpdates);
  // TODO: Send all or changes through SPI
}

function deleteGroup(id){
  array.splice(id, 1);
}

// TODO: Right now this will affect both what is displayed on screen and 
// what the panel affects. This may or may not be confusing...
function selectGroup(id){
  currentGroup = groups[id];
  //TODO: Send current group through SPI
  return currentGroup;
}

function getCurrentGroup(){
  return currentGroup;
}

function initVoices(){
  voices = [];
  for(var i=0; i<config.voices.numberOfVoices; i++){
    voices.push({
      id: i,
      name: "Voice " + i,
      vcos: [],
      group: undefined
    });
  }

  for(var vco; vco < 3; vco++){
    voices.vcos = [];
    voices.vcos.push(
      {
        name: "VCO " + vco,
        tuning: {
          isTuneable: true,
          corrections: [],          
        }
      }
    );
  }
}

function initGroups(){
  createGroup(0);
  for(var i=0; i<config.voices.numberOfVoices; i++){
    assignVoiceToGroup(0, i);
  }
}

function setGroupGraph(groupId, graph){
  groups[groupId].graph.graph = graph;
  //TODO: Send graph thru SPI
}

function removeFromArray(array, element){
  array.splice(array.indexOf(element), 1);
}

function assignVoiceToGroup(groupId, voiceId){
  var group = groups[groupId];
  var voice = voices[voiceId];

  // remove existing mapping
  if(voice.group){
    removeVoiceFromGroup(group.id, voice.id);
  }

  if(!_.includes(group.voices, voice)){
    group.voices.push(voices[voiceId]);
    voice.group = group;
  }

  // TODO: Send via SPI
}

function removeVoiceFromGroup(groupId, voiceId){
  var group = groups[groupId];
  var voice = voices[voiceId];

  removeFromArray(group.voices, voices[voiceId]);
  voice.group = undefined;

  // TODO: Send via SPI
}

function tuneAll(){
  //TODO: Send via spi
  //TODO: Get tuning results and add to voices
  //TODO: Callback with tuning results
}

function updateGlobalTuning(updatedGlobalTuning){
  globalTuning = updatedGlobalTuning;
  //TODO: Send via spi
  //TODO: callback with tuning results
}

function getGlobalTuning(){
  return globalTuning;
}

function areAllTunable(){
  return allAreTuneable;
}

initVoices();
initGroups();