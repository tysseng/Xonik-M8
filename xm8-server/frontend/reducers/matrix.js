import {OrderedMap, Map, List, fromJS} from 'immutable';
import _ from 'lodash';
import { types as inputTypes } from '../../shared/state/actions/inputs';

const byId = (state, action) => {
  switch(action.type){
    
  } 
  return state;  
}

const inputs = (
  state = Map({
    directoutputs: Map({
      latestToggle: Map({inputId: '', outputId: ''})
    })
  }),
  action) => {

  switch(action.type){
    case 'SET_STATE':
      if(action.state.matrix){
        return state.merge(action.state.matrix);
      }        
      break;   
  } 
  return state;
}

export default inputs;
