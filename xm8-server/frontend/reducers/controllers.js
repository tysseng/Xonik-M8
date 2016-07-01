import {OrderedMap, Map, List, fromJS} from 'immutable';
import _ from 'lodash';

const inputs = (
  state = Map(),
  action) => {

  switch(action.type){
    case 'SET_STATE':
      if(action.state.controllers){
        return state.clear().merge(action.state.controllers);
      }
      break;   
  } 
  return state;
}

export default inputs;
