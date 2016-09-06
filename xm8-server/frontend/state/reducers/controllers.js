import { Map } from 'immutable';
import { types } from '../../../shared/state/actions/controllers';
import { getUpdatedState } from './reducerTools';
import config from '../../../shared/config';

const emptyState = (() => {
  let controllers = new Map();
  for(let i=0; i<config.voices.numberOfGroups; i++){
    let patchNumber = '' + i;
    controllers = controllers.set(patchNumber, Map());
  }
  return controllers;
})();

const controllersForPatch = (
  state = Map({
    selectedGroupId: ''
  }),
  action) => {

  switch(action.type){
    case 'SET_STATE':
      let updatedState = getUpdatedState(['controllers', '0'], action);
      if(updatedState){
        return state.merge(updatedState);
      }
      break;
    case types.SELECT_CONTROL_GROUP:
      return state.set('selectedGroupId', action.selectedGroupId);
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
