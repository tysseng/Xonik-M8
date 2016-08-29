import { Map } from 'immutable';
import { types } from '../../shared/state/actions/inputs';
import { types as nodeActionTypes } from '../../shared/state/actions/nodes';

const root = (
  state = Map(),
  action) => {

  switch(action.type){
    case types.CONTROLLER_CHANGE:
      return state.set(action.id, action.value);
    case nodeActionTypes.LOAD_PATCH_FROM_FILE:
      return action.controllers;
  } 
  return state;
}

export default root;
