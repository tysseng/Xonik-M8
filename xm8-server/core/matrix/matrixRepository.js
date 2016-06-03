import _ from 'lodash';
import store from '../state/store.js';
import config from '../../shared/config.js';
import spi from '../spi/spi-fd.js';
import serializer from './serializer.js';
import preparer from './preparer.js';
import printer from './printer.js';
import commands from './commands.js';
import {newFile, updateFile} from '../../shared/state/actions/filesystemActions';
import {setLoadedPatchFileDetails} from '../../shared/state/actions';
import {filetypes} from '../../shared/FileTypes';
import {findPath} from '../../shared/filesystem/fileTools';
import {saveFile, loadFile} from '../persistence/fileRepo';
import {fromJS} from 'immutable';

// auto-update voices whenever state changes
// TODO: listen to only matrix changes!
store.subscribe(
  () => {
    if(store.getState().matrix.get('shouldAutoUpdate')){
      sendMatrix(); 
    }
  }
);

function sendMatrix(){
  if(!preparer.isNetValid()){
    console.log("Matrix has validation errors, synth voices not updated");
    return {updated: false, message: "Matrix has validation errors, synth voices not updated"};
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
      nodes: store.getState().nodes.toJS()
    }
  }

  // TODO: Move this to filesystem
  // search for existing file by name, reuse id if name is found
  let fileId;
  let filesystem = store.getState().filesystem;
  let folder = filesystem.getIn(findPath(folderId, filesystem));
  let filesInFolder = folder.get('files');

  _.forEach(filesInFolder.toJS(), file => {
    if(file.name === name){
      fileId = file.id;
      return false;
    }
  });


  let result = saveFile(file, filetypes.PATCH, fileId);
  if(result.fileSaved){
    // TODO: Move to filesystem
    if(result.version === 0){
      store.dispatch(newFile(result.fileId, result.version, name, folderId));
    } else {
      store.dispatch(updateFile(result.fileId, result.version, folderId));
    }
    store.dispatch(setLoadedPatchFileDetails(result.fileId));
  } 
  return result;
}

export const load =(fileId, version) => {
  let file = loadFile(fileId, version);
  if(file && file.contents && file.contents.nodes){
    let immutableContents = fromJS(file);
    store.dispatch(loadNodesFromFile(fileId, version, immutableContents));
  }
}

function serialize(){
  var net = preparer.prepareNetForSerialization();
  printer.printNet(net);

  var buffers = [];

  // add all constants and constant lengths
  for(var i = 0; i<net.constants.length; i++){
    var serializedConstant = serializer.serializeConstant(i + config.matrix.numberOfInputs, net.constants[i]);
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

module.exports.sendMatrix = sendMatrix;
