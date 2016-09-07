import { fromJS } from 'immutable';

import { saveDirect, loadDirect } from '../persistence/fileRepo';
import { hasChangedPhysicalInputs, clearHasChangedPhysicalInputs } from '../state/inputs';
import { getPhysicalInputs } from '../state/selectors';
import config from '../../shared/config.js';

const autosaveFilename = config.persistence.autosave.rootFolder + config.persistence.autosave.physicalInputs.file;

export const autosave = () => {
  if(hasChangedPhysicalInputs){

    saveDirect(autosaveFilename, getAsFile());
    clearHasChangedPhysicalInputs();
  }
  setTimeout(autosave, config.persistence.autosave.physicalInputs.intervalMs);
}

export const getAutosaved = () => {
  let file = loadDirect(autosaveFilename);
  if(file) {
    return fromJS(file.contents.physicalInputs);
  } else {
    return undefined;
  }
}

const getAsFile = () => {
  return {
    contents: {
      physicalInputs: getPhysicalInputs().toJS(),
    }
  };
}