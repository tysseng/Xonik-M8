import _ from 'lodash';
import store from '../state/store.js';
import config from '../../shared/config.js';
import spi from '../spi/spi-fd.js';
import serializer from './serializer.js';
import preparer from './preparer.js';
import printer from './printer.js';
import commands from './commands.js';
import { getGraph, getMatrix, getVirtualInputs, getVirtualInputGroups, getControllers} from '../state/selectors';

import {loadPatchFromFile, setLoadedPatchFileDetails} from '../../shared/state/actions/nodes';
import {filetypes} from '../../shared/FileTypes';
import {saveFile, loadFile} from '../persistence/fileRepo';
import {fromJS} from 'immutable';

import { hasChangedVirtualInputs, clearHasChangedVirtualInputs } from '../state/inputs';
import { hasChanged as hasChangedGraph, clearHasChanged as clearHasChangedGraph } from '../state/graph';
import { hasChanged as hasChangedMatrix, clearHasChanged as clearHasChangedMatrix } from '../state/matrix';
import { hasChanged as hasChangedControls, clearHasChanged as clearHasChangedControls } from '../state/controllers';
import { hasChanged as hasChangedVirtualInputGroups, clearHasChanged as clearHasChangedVirtualInputGroups } from '../state/inputgroups';


// auto-update voices whenever state changes
// TODO: listen to only graph changes!
store.subscribe(
  () => {
    if(store.getState().graph.get('shouldAutoUpdate')){
      sendGraph(); 
    }
  }
);

const autosave = () => {
  if(hasChangedGraph ||
    hasChangedMatrix ||
    hasChangedVirtualInputGroups ||
    hasChangedControls ||
    hasChangedVirtualInputs){
    console.log("Patch has changed, saving");
    //save('autosavedPatch', 'autosaves');

    clearHasChangedGraph();
    clearHasChangedMatrix();
    clearHasChangedVirtualInputGroups();
    clearHasChangedControls();
    clearHasChangedVirtualInputs();
  }
  setTimeout(autosave, 3000);
}
//run autosave in a loop;
autosave();

function sendGraph(){
  if(!preparer.isNetValid()){
    console.log("Graph has validation errors, synth voices not updated");
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

export const save = (name, folderId) => {
  if(!name || !folderId){
    return {fileSaved: false, message: "Name or folder id missing"};
  }

  // TODO: Store input values as well
  let file = {
    contents: {
      graph: getGraph().toJS(),
      matrix: getMatrix().toJS(),
      virtualInputs: getVirtualInputs().toJS(),
      virtualInputGroups: getVirtualInputGroups().toJS(),
      controllers: getControllers().toJS()
    }
  };

  let result = saveFile(file, filetypes.PATCH, name, folderId);

  if(result.fileSaved){
    store.dispatch(setLoadedPatchFileDetails(result.fileId, result.version));
  } 
  return result;
};

export const load =(fileId, version) => {
  let file = loadFile(fileId, version);

  if(file && file.contents && file.contents.graph){

    // TODO: Figure out how to make sure this is an orderedMap
    let immutableGraph = fromJS(file.contents.graph);
    let immutableMatrix = fromJS(file.contents.matrix);
    let immutableVirtualInputs = fromJS(file.contents.virtualInputs);
    let immutableVirtualInputGroups = fromJS(file.contents.virtualInputGroups);
    let immutableControllers = fromJS(file.contents.controllers);
    store.dispatch(
      loadPatchFromFile(
        fileId, version,
        immutableGraph,
        immutableMatrix,
        immutableVirtualInputs,
        immutableVirtualInputGroups,
        immutableControllers));
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

module.exports.sendGraph = sendGraph;
