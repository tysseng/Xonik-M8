import { Map } from 'immutable';
import { types } from '../../shared/state/actions/inputs';
import { types as nodeActionTypes } from '../../shared/state/actions/nodes';

export let hasChanged = false;
const setHasChanged = () => hasChanged = true;
export const clearHasChanged = () => hasChanged = false;


const root = (
  state = Map(),
  action) => {

  switch(action.type){
    case types.CONTROLLER_CHANGE:
      setHasChanged();
      return state.set(action.id, action.value);
    case nodeActionTypes.LOAD_PATCH_FROM_FILE:
      return action.controllers;
  } 
  return state;
}

export default root;
