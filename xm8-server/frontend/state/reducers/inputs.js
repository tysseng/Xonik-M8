import {OrderedMap, Map, List, fromJS} from 'immutable';
import { types as inputTypes } from '../../../shared/state/actions/inputs';

export const virtualInputs = (
  state = getInitialState(),
  action) => {
  switch(action.type){
    case 'SET_STATE':
      if(action.state.virtualInputs){
        return state.merge(action.state.virtualInputs);
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
  state = getInitialState(),
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

const getInitialState = () => {
  return Map({
    byId: Map(),
    groups: Map(),
    frontend: Map()
  });
}