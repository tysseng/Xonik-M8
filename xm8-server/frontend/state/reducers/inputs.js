import { Map } from 'immutable';
import { types as inputTypes } from '../../../shared/state/actions/inputs';
import { getUpdatedState } from './reducerTools';

export const virtualInputs = (state, action) => {
  switch(action.type){
    case 'SET_STATE':
      let updatedState = getUpdatedState(['patches', '0', 'virtualInputs'], action);
      if(updatedState){
        return state.merge(updatedState);
      }
      break;
    case inputTypes.INPUTCONFIG_SELECT_INPUT: 
      if(action.inputType === 'virtual'){
        return state.setIn(['frontend', 'selectedInput'], action.selectedInput);   
      } else {
        return state;
      }
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
    case inputTypes.INPUTCONFIG_SELECT_INPUT: 
      if(action.inputType === 'physical'){
        return state.setIn(['frontend', 'selectedInput'], action.selectedInput);   
      } else {
        return state;
      }
  } 
  return state;
}

export const emptyState = Map({
  byId: Map(),
  groups: Map(),
  frontend: Map()
});