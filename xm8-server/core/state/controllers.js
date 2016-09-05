import { Map } from 'immutable';
import { types } from '../../shared/state/actions/inputs';
import { types as patchActionTypes } from '../../shared/state/actions/patch';
import { getPatchNum } from './reducerTools';
import config from '../../shared/config';
import changeTracker from '../state/controllersChangeTracker';

const emptyState = (() => {
  let controllers = new Map();
  for(let i=0; i<config.voices.numberOfGroups; i++){
    controllers = controllers.set(getPatchNum(i), Map());
  }
  return controllers;
})();

const controllersForPatch = (state, action) => {
  switch(action.type){
    case types.CONTROLLER_CHANGE:
      console.log("Controller changed", action.patchNumber);
      changeTracker.set(action.patchNumber);
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
