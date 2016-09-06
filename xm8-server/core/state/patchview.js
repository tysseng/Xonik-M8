import {Map} from 'immutable';

import types from '../../shared/state/actions/patch';

const patchview = (state = Map({shouldAutoUpdate: false, patch: Map()}), action) => {
  switch (action.type){
    case 'TOGGLE_AUTO_UPDATE':
      return state.set("shouldAutoUpdate", action.shouldAutoUpdate);
    case types.SET_LOADED_PATCH_FILE_DETAILS:
      return state
        .setIn(['patch', 'fileId'], action.fileId)
        .setIn(['patch', 'version'], action.version);
    case types.LOAD_PATCH_FROM_FILE:
      return state
        .setIn(['patch', 'fileId'], action.fileId)
        .setIn(['patch', 'version'], action.version);
    default: 
      return state;
  }
}

export default patchview