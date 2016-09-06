import { Map } from 'immutable';
import { types } from '../../shared/state/actions/patch';

const getLoadedFileMap = action => {
  return Map({
    fileId: action.fileId,
    version: action.version,
    filename: action.filename,
    folderId: action.folderId
  });
}

const patchview = (state = Map({shouldAutoUpdate: false, patch: Map()}), action) => {
  switch (action.type){
    case 'TOGGLE_AUTO_UPDATE':
      return state.set("shouldAutoUpdate", action.shouldAutoUpdate);
    case types.SET_LOADED_PATCH_FILE_DETAILS:
    case types.LOAD_PATCH_FROM_FILE:
      return state.set('patch', getLoadedFileMap(action));
    default:
      return state;
  }
}

export default patchview