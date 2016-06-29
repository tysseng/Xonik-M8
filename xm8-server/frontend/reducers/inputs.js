import {OrderedMap, Map, List, fromJS} from 'immutable';
import _ from 'lodash';

const inputs = (
  state = Map({
    byId: Map(),
    groups: Map()
  }),
  action) => {

  switch(action.type){
    case 'SET_STATE':
      if(action.state.inputs){
        return state.clear().merge(action.state.inputs);
      }        
  } 
  return state;
}

export default inputs;
