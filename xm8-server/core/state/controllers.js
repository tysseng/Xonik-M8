import {OrderedMap, Map, Iterable, fromJS} from 'immutable';
import _ from 'lodash';
import { types } from '../../shared/state/actions/inputs';

// TODO: Load initial values from inputs
// TODO: Set value when adding new input

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
