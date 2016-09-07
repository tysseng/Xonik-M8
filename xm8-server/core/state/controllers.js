import { Map } from 'immutable';
import { types } from '../../shared/state/actions/inputs';
import { types as patchActionTypes } from '../../shared/state/actions/patch';
import { getPatchNum } from './reducerTools';
import config from '../../shared/config';
import changeTracker from '../state/controllersChangeTracker';
import { autosaver } from '../controller/controllerRepository';

const emptyState = (() => {
  let controllers = new Map();
  for(let i=0; i<config.voices.numberOfGroups; i++){
    let autosaved = autosaver.getAutosaved(getPatchNum(i));
    if(autosaved){
      controllers = controllers.set(getPatchNum(i), autosaved);
    } else {
      controllers = controllers.set(getPatchNum(i), Map());
    }
  }
  return controllers;
})();

const controllersForPatch = (state, action) => {
  switch(action.type){
    case types.CONTROLLER_CHANGE:
      changeTracker.set(action.patchNumber);
      return state.set(action.id, action.value);
    case patchActionTypes.LOAD_PATCH_FROM_FILE:
      changeTracker.set(action.patchNumber);
      return action.controllers;
  } 
  return state;
}

const controllers = (state = emptyState, action) => {
  if(action.patchNumber) {
    return state.updateIn([action.patchNumber], controllerState => controllersForPatch(controllerState, action))
  } else {
    return state;
  }
}

export default controllers;
