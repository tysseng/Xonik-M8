import { Map } from 'immutable';
import { types as guiInputActionTypes } from '../../../../shared/state/actions/gui/guiinputs';
import { types as patchActionTypes } from '../../../../shared/state/actions/patch';
import config from '../../../../shared/config';

export const emptyStateForPatch = Map({
  frontend: Map()
});

const emptyState = (() => {
  let inputs = new Map();
  for(let i=0; i<config.voices.numberOfGroups; i++){
    let patchNumber = '' + i;
    inputs = inputs.set(patchNumber, emptyStateForPatch);
  }
  return inputs;
})();

export const virtualInputs = (state, action) => {
  switch(action.type){
    case guiInputActionTypes.INPUTCONFIG_SELECT_INPUT:
      if(action.inputType === 'virtual'){
        return state.setIn(['frontend', 'selectedInput'], action.selectedInput);   
      }
      return state;
    case patchActionTypes.RESET_PATCH:
      return state.setIn(['frontend', 'selectedInput'], '');
    default:
      return state;
  }
}

const perPatchWrapper = (state = emptyState, action) => {
  if(action.patchNumber) {
    return state.updateIn([action.patchNumber], subState => virtualInputs(subState, action))
  } else {
    return state;
  }
}

export default perPatchWrapper;
