import { Map } from 'immutable';
import { types as inputActionTypes } from '../../../shared/state/actions/inputs';
import { types as patchActionTypes } from '../../../shared/state/actions/patch';
import { getUpdatedState } from './reducerTools';

export const virtualInputs = (state, action) => {
  switch(action.type){
    case 'SET_STATE':
      let updatedState = getUpdatedState(['virtualInputs'], action);
      if(updatedState){
        return state.merge(updatedState);
      }
      return state;
    case inputActionTypes.INPUTCONFIG_SELECT_INPUT:
      if(action.inputType === 'virtual'){
        return state.setIn(['frontend', 'selectedInput'], action.selectedInput);   
      }
      return state;
    case patchActionTypes.RESET_PATCH:
      return state.setIn(['frontend', 'selectedInput'], '');
  }
  return state;
}

export const physicalInputs = (
  state = emptyState,
  action) => {
  switch(action.type){
    case 'SET_STATE':
      if(action.state.physicalInputs){
        return state.merge(action.state.physicalInputs);
      }        
      break;   
    case patchActionTypes.INPUTCONFIG_SELECT_INPUT:
      if(action.inputType === 'physical'){
        return state.setIn(['frontend', 'selectedInput'], action.selectedInput);   
      }
      break;
    case inputActionTypes.RESET_PHYSICAL_INPUTS:
      return state.setIn(['frontend', 'selectedInput'], '');
  } 
  return state;
}

export const emptyState = Map({
  byId: Map(),
  groups: Map(),
  frontend: Map()
});