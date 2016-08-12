import {OrderedMap, Map, List, fromJS} from 'immutable';
import _ from 'lodash';
import { types as inputTypes } from '../../shared/state/actions/inputs';

const byId = (state, action) => {
  switch(action.type){
    
  } 
  return state;  
}

const inputs = (
  state = getInitialState(),
  action) => {

  switch(action.type){
    case 'SET_STATE':
      if(action.state.inputs){
        // retain frontend state by only clearing backend props. Should perhaps separate these better
        state = state.setIn(['physical', 'byId'], Map()).set('groups', Map());
        state = state.setIn(['virtual', 'byId'], Map()).set('groups', Map());
        return state.merge(action.state.inputs);
      }        
      break;   
    case inputTypes.INPUTCONFIG_SELECT_INPUT: 
      return state.set("selectedInput", action.selectedInput);   
  } 
  return state;
}

const getInitialState = () => {
  return Map({
    // physical inputs are global and not affected by patches
    physical: Map({
      byId: Map()
    }),
    // virtual inputs are per patch and loaded/saved along with a patch
    virtual: Map({
      byId: Map()
    }),
    // for the time being groups are per patch, but we need default groups
    groups: Map()
  });
}

export default inputs;
