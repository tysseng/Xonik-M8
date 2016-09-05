import config from '../../shared/config.js';
import { getPatchNum } from '../state/reducerTools';
import { saveDirect, loadDirect } from '../persistence/fileRepo';
import { fromJS } from 'immutable';

export const initPatchAutosaver = (changeTracker, contentRetriever, file) => {
  let autosaveFilename = config.persistence.autosave.rootFolder + file;
  let autosave = function(){
    for(let i = 0; i< config.voices.numberOfGroups; i++) {
      let patchNumber = getPatchNum(i);

      if (changeTracker.hasChanged[patchNumber]) {
        saveDirect(autosaveFilename + patchNumber, contentRetriever(patchNumber).toJS());
        changeTracker.clear(patchNumber);
      }
    }
    setTimeout(autosave, config.persistence.autosave.patch.intervalMs);
  };

  let getAutosaved = function(patchNumber){
    let file = loadDirect(autosaveFilename + patchNumber);
    if(file) {
      return fromJS(file);
    } else {
      return undefined;
    }
  };

  return {
    autosave,
    getAutosaved
  }
}