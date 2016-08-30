import { fromJS } from 'immutable';

import { saveDirect, loadDirect } from '../persistence/fileRepo';
import { hasChangedPhysicalInputs, clearHasChangedPhysicalInputs } from '../state/inputs';
import { getPhysicalInputs } from '../state/selectors';
import { loadPhysicalInputsFromFile } from '../../shared/state/actions/inputs';
import config from '../../shared/config.js';
import store from '../state/store.js';

const filename = 'physicalinputs';

export const autosave = () => {
  if(hasChangedPhysicalInputs){
    saveDirect(config.persistence.autosave.physicalInputs.file, getAsFile());
    clearHasChangedPhysicalInputs();
  }
  setTimeout(autosave, config.persistence.autosave.physicalInputs.intervalMs);
}

export const loadAutosaved = () => {
  let file = loadDirect(config.persistence.autosave.physicalInputs.file, filename);
  dispatchLoadedFile(file);
}

const getAsFile = () => {
  return {
    contents: {
      physicalInputs: getPhysicalInputs().toJS(),
    }
  };
}

const dispatchLoadedFile = (file) => {
  if(file && file.contents && file.contents.physicalInputs){

    let immutablePhysicalInputs = fromJS(file.contents.physicalInputs);

    store.dispatch(
      loadPhysicalInputsFromFile('', '', immutablePhysicalInputs)
    );
  }
}