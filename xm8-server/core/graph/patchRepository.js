import _ from 'lodash';
import store from '../state/store.js';
import config from '../../shared/config.js';
import spi from '../spi/spi-fd.js';
import serializer from './serializer.js';
import preparer from './preparer.js';
import printer from './printer.js';
import commands from './commands.js';
import { getPatch, getGraph, getMatrix, getVirtualInputs, getVirtualInputGroups, getControllers} from '../state/selectors';

import { loadPatchFromFile } from '../../shared/state/actions/patch';
import { setLoadedPatchFileDetails } from '../../shared/state/actions/nodes';
import { filetypes } from '../../shared/FileTypes';
import { saveFile, loadFile, saveDirect, loadDirect } from '../persistence/fileRepo';
import { fromJS } from 'immutable';

import { hasChangedVirtualInputs, clearHasChangedVirtualInputs } from '../state/inputs';
import { hasChanged as hasChangedGraph, clearHasChanged as clearHasChangedGraph } from '../state/graph';
import { hasChanged as hasChangedMatrix, clearHasChanged as clearHasChangedMatrix } from '../state/matrix';
import { hasChanged as hasChangedControls, clearHasChanged as clearHasChangedControls } from '../state/controllers';
import { hasChanged as hasChangedVirtualInputGroups, clearHasChanged as clearHasChangedVirtualInputGroups } from '../state/inputgroups';

const autosaveFilename = config.persistence.autosave.rootFolder + config.persistence.autosave.patch.file;


// auto-update voices whenever state changes
// TODO: listen to only graph changes!
/*store.subscribe(
  () => {
    if(getGraph().get('shouldAutoUpdate')){
      sendPatch();
    }
  }
);*/

const patchHasChanged = () => {
  return hasChangedGraph ||
    hasChangedMatrix ||
    hasChangedVirtualInputGroups ||
    hasChangedControls ||
    hasChangedVirtualInputs
}

const resetPatchChangedState = () => {
  clearHasChangedGraph();
  clearHasChangedMatrix();
  clearHasChangedVirtualInputGroups();
  clearHasChangedControls();
  clearHasChangedVirtualInputs();
}

export const autosave = () => {
  for(let i = 0; i< config.voices.numberOfGroups; i++) {
    if (patchHasChanged(i)) {
      saveDirect(autosaveFilename + i, getPatch('' + i).toJS());
      resetPatchChangedState(i);
    }
  }
  setTimeout(autosave, config.persistence.autosave.patch.intervalMs);
}

export const getAutosaved = (patchNumber) => {
  let file = loadDirect(autosaveFilename + patchNumber);
  if(file) {
    return fromJS(file);
  } else {
    return undefined;
  }
}

function sendPatch(){
  if(!preparer.isNetValid()){
    console.log("Patch has validation errors, synth voices not updated");
    return {updated: false, message: "Graph has validation errors, synth voices not updated"};
  }
  
  spi.write(commands.stop);

  var buffers = serialize();
  _.each(buffers, function(buffer){
    spi.write(buffer);
  });  
  spi.write(commands.restart);

  return {updated: true, message: "Synth voices updated"};  
}

const getAsFile = (patchNumber) => {
  return {
    contents: {
      patch: getPatch(patchNumber),
      controllers: getControllers().toJS()
    }
  };
}

export const save = (patchNumber, name, folderId) => {
  if (!name || !folderId) {
    return {fileSaved: false, message: "Name or folder id missing"};
  }

  let result = saveFile(getAsFile(patchNumber), filetypes.PATCH, name, folderId, true);
  if (result.fileSaved) {
    store.dispatch(setLoadedPatchFileDetails(result.fileId, result.version));
  }
  return result;
};

export const load =(patchNumber, fileId, version) => {
  let file = loadFile(fileId, version);

  if(file && file.contents && file.contents.patch){

    // TODO: Figure out how to make sure this is an orderedMap
    store.dispatch(
      loadPatchFromFile(
        patchNumber,
        fileId, version,
        fromJS(file.contents.patch),
        fromJS(file.contents.controllers)));
  }
};

function serialize(){
  var net = preparer.prepareNetForSerialization();
  printer.printNet(net);

  var buffers = [];

  // add all constants and constant lengths
  for(var i = 0; i<net.constants.length; i++){
    var serializedConstant = serializer.serializeConstant(i + config.graph.numberOfInputs, net.constants[i]);
    buffers.push(serializedConstant);
  }
  buffers.push(serializer.serializeConstantsCount(net.constants));

  // add all nodes and node array length
  _.each(net.nodes, function(node){
    var serializedNode = serializer.serializeNode(node);
    buffers.push(serializedNode);
  });
  buffers.push(serializer.serializeNodeCount(net.nodes));

  return buffers;
}

module.exports.sendPatch = sendPatch;