import { Map } from 'immutable';
import { types } from '../../../shared/state/actions/controllers';
import { getUpdatedState, getPatchNum } from './reducerTools';
import config from '../../../shared/config';
import { setState } from '../../../shared/state/actions/index';

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
      return state.merge(action.state);
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

      // The sub reducers do not know what patch they are
      // working on. Extract state for a single patch and
      // send this to the sub reducer.
      let updatedState = getUpdatedState(['controllers', getPatchNum(i)], action);
      if (updatedState) {
        let subAction = setState(updatedState);
        state = state.updateIn([getPatchNum(i)], controllerState => controllersForPatch(controllerState, subAction))
      }
    }
    return state;
  } else {
    return state;
  }
}

export default controllers;
