import {OrderedMap, Map, List, fromJS} from 'immutable';
import _ from 'lodash';
import inputActionTypes from '../../shared/state/actions/inputsActionTypes';

const byId = (state, action) => {
  switch(action.type){
    
  } 
  return state;  
}

const inputs = (
  state = Map({
    byId: Map(),
    groups: Map(),
    selectedInput: ''
  }),
  action) => {

  switch(action.type){
    case 'SET_STATE':
      if(action.state.inputs){
        // retain frontend state by only clearing backend props. Should perhaps separate these better
        state = state.set('byId', Map()).set('groups', Map());
        return state.merge(action.state.inputs);
      }        
      break;   
    case inputActionTypes.INPUTCONFIG_SELECT_INPUT: 
      return state.set("selectedInput", action.selectedInput);   
  } 
  return state;
}

export default inputs;
