import { Map } from 'immutable';
import { types } from '../../shared/state/actions/patch';
import { getPatchNum } from './reducerTools';
import config from '../../shared/config';
import changeTracker from '../state/patchviewChangeTracker';
import { autosaver } from '../patch/patchviewRepository';

const getLoadedFileMap = action => {
  return Map({
    fileId: action.fileId,
    version: action.version,
    filename: action.filename,
    folderId: action.folderId
  });
}

const emptyState = (() => {
  let patchviews = new Map();
  for(let i=0; i<config.voices.numberOfGroups; i++){
    let autosaved = autosaver.getAutosaved(getPatchNum(i));
    if(autosaved){
      patchviews = patchviews.set(getPatchNum(i), autosaved);
    } else {
      patchviews = patchviews.set(getPatchNum(i), Map({shouldAutoUpdate: false, patch: Map()}));
    }
  }
  return patchviews;
})();

const patchview = (state, action) => {
  switch (action.type){
    case types.TOGGLE_AUTO_UPDATE:
      return state.set("shouldAutoUpdate", action.shouldAutoUpdate);
    case types.SET_LOADED_PATCH_FILE_DETAILS:
    case types.LOAD_PATCH_FROM_FILE:
      changeTracker.set(action.patchNumber);
      return state.set('patch', getLoadedFileMap(action));
    default:
      return state;
  }
}

const patchviews = (state = emptyState, action) => {
  // TODO: Change later.
  action.patchNumber = '0';
  if(action.patchNumber) {
    return state.updateIn([action.patchNumber], patchviewState => patchview(patchviewState, action));
  } else {
    return state;
  }
}


export default patchviews