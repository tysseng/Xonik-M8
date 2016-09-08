import { Map } from 'immutable';
import { types } from '../../../shared/state/actions/controllers';
import { getPerPatchWrapper } from './reducerTools';
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
      return state.merge(action.state);
    case types.SELECT_CONTROL_GROUP:
      return state.set('selectedGroupId', action.selectedGroupId);
    default:
      return state;
  }
}

const controllers = getPerPatchWrapper({
  emptyState,
  wrappedReducer: controllersForPatch,
  updateStatePath: 'controllers'
});

export default controllers;
