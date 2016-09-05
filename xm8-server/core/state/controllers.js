import { Map } from 'immutable';
import { types } from '../../shared/state/actions/inputs';
import { types as patchActionTypes } from '../../shared/state/actions/patch';
import config from '../../shared/config';

export let hasChanged = (() => {
  let initialChanges = {};
  for(let i=0; i<config.voices.numberOfGroups; i++){
    let patchNumber = '' + i;
    initialChanges[patchNumber] = false;
  }
  return initialChanges;
})();

const setHasChanged = (patchNumber) => hasChanged[patchNumber] = true;
export const clearHasChanged = (patchNumber) => hasChanged[patchNumber] = false;

const emptyState = (() => {
  let controllers = new Map();
  for(let i=0; i<config.voices.numberOfGroups; i++){
    let patchNumber = '' + i;
    controllers = controllers.set(patchNumber, Map());
  }
  return controllers;
})();

const controllersForPatch = (state, action) => {

  switch(action.type){
    case types.CONTROLLER_CHANGE:
      console.log("Controller changed", action.patchNumber);
      setHasChanged(action.patchNumber);
      return state.set(action.id, action.value);
    case patchActionTypes.LOAD_PATCH_FROM_FILE:
      return action.controllers;
  } 
  return state;
}

const controllers = (state = emptyState, action) => {
  // TODO: Change later.
  action.patchNumber = '0';
  if(action.patchNumber) {
    return state.updateIn([action.patchNumber], controllerState => controllersForPatch(controllerState, action))
  } else {
    return state;
  }
}

export default controllers;
