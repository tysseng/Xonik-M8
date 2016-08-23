import { Map } from 'immutable';
import { types } from '../../../shared/state/actions/controllers';

const controllers = (
  state = Map({
    selectedGroupId: ''
  }),
  action) => {

  switch(action.type){
    case 'SET_STATE':
      if(action.state.controllers){
        return state.clear().merge(action.state.controllers);
      }
      break;
    case types.SELECT_CONTROL_GROUP:
      return state.set('selectedGroupId', action.selectedGroupId);
  } 
  return state;
}

export default controllers;
