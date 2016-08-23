import { Map } from 'immutable';
import { types } from '../../shared/state/actions/inputs';

const root = (
  state = Map(),
  action) => {

  switch(action.type){
    case types.CONTROLLER_CHANGE:
      return state.set(action.id, action.value);
  } 
  return state;
}

export default root;
