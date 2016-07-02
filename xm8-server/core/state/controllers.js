import {OrderedMap, Map, Iterable, fromJS} from 'immutable';
import _ from 'lodash';
import inputActionTypes from '../../shared/state/actions/inputsActionTypes';

// TODO: Load initial values from inputs
// TODO: Set value when adding new input

const root = (
  state = Map(),
  action) => {

  switch(action.type){
    case inputActionTypes.CONTROLLER_CHANGE:
      return state.set(action.id, action.value);
  } 
  return state;
}

export default root;
