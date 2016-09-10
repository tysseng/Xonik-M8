import { Map } from 'immutable';
import { types } from '../../../../shared/state/actions/gui/guicontrollers';
import config from '../../../../shared/config';

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
    case types.SELECT_CONTROL_GROUP:
      return state.set('selectedGroupId', action.selectedGroupId);
    default:
      return state;
  }
}

const controllers = (state = emptyState, action) => {
  if(action.patchNumber) {
    return state.updateIn([action.patchNumber], subState => controllersForPatch(subState, action))
  } else {
    return state;
  }
}

export default controllers;
