import _ from 'lodash';
import store from '../state/store.js';
import config from '../../shared/config.js';
import spi from '../spi/spi-fd.js';
import preparer from './preparer.js';
import commands from './commands.js';
import { getPatch, getControllers, getNodes } from '../state/selectors';

import { loadPatchFromFile, setLoadedPatchFileDetails } from '../../shared/state/actions/patch';
import { initPatchAutosaver } from '../autosave/autosaver';
import { filetypes } from '../../shared/FileTypes';
import { saveFile, loadFile } from '../persistence/fileRepo';
import { fromJS } from 'immutable';

import changeTracker from '../state/patchesChangeTracker';

export let autosaver = initPatchAutosaver(changeTracker, getPatch, config.persistence.autosave.patch.file);

// auto-update voices whenever state changes
// TODO: listen to only graph changes!
/*store.subscribe(
  () => {
    if(getGraph().get('shouldAutoUpdate')){
      sendPatch();
    }
  }
);*/

function sendPatch(patchNumber){

  let nodesState = getNodes(patchNumber);

  if(!preparer.isNetValid(nodesState)){
    console.log("Patch has validation errors, synth voices not updated");
    return {updated: false, message: "Graph has validation errors, synth voices not updated"};
  }
  
  spi.write(commands.stop);

  var buffers = serialize(nodesState.toJS());
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
      controllers: getControllers(patchNumber).toJS()
    }
  };
}

export const save = ({patchNumber, filename, folderId}) => {
  if (!filename || !folderId) {
    return {fileSaved: false, message: "Name or folder id missing"};
  }

  let result = saveFile({
    file: getAsFile(patchNumber),
    type: filetypes.PATCH,
    filename,
    folderId,
    versioned: true
  });

  if (result.fileSaved) {
    store.dispatch(setLoadedPatchFileDetails({
      fileId: result.fileId,
      version: result.version,
      filename: result.filename,
      folderId: result.folderId,
      patchNumber
    }));
  }
  return result;
};

export const load =({patchNumber, filename, folderId, fileId, version}) => {
  let file = loadFile(fileId, version);

  if(file && file.contents && file.contents.patch){
    // TODO: Figure out how to make sure this is an orderedMap
    store.dispatch(
      loadPatchFromFile({
        fileId,
        version,
        filename,
        folderId,
        patchNumber,
        patch: fromJS(file.contents.patch),
        controllers: fromJS(file.contents.controllers)
      }));
  }
};

module.exports.sendPatch = sendPatch;
