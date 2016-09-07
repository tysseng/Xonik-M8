import { Map } from 'immutable';
import { types } from '../../../shared/state/actions/controllers';
import { getUpdatedState, getPatchNum } from './reducerTools';
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
      return state;
    case types.SELECT_CONTROL_GROUP:
      return state.set('selectedGroupId', action.selectedGroupId);
    default:
      return state;
  }
}

const controllers = (state = emptyState, action) => {
  if(action.patchNumber) {
    return state.updateIn([action.patchNumber], controllerState => controllersForPatch(controllerState, action))
  } else if(action.type === 'SET_STATE') {
    for(let i=0; i<config.voices.numberOfGroups; i++) {
      if (getUpdatedState(['controllers', getPatchNum(i)], action)) {
        state = state.updateIn([getPatchNum(i)], controllerState => controllersForPatch(controllerState, action))
      }
    }
    return state;
  } else {
    return state;
  }
}

export default controllers;
