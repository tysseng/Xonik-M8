import {OrderedMap, Map, Iterable, fromJS} from 'immutable';
import _ from 'lodash';
import {inputsById, inputGroupsById} from '../../shared/matrix/inputs';

//TODO: Put values in separate map

const groups = (state,action) => {

  switch(action.type){
  } 
  return state;
}

const byId = (state, action) => {
  switch(action.type){
    case 'CONTROLLER_CHANGE':
      return state.setIn([action.id, 'value'], action.value);
  } 
  return state;
}

const root = (
  state = Map({
    byId: fromJS(inputsById),
    groups: fromJS(inputGroupsById)
  }),
  action) => {

  switch(action.type){
    case 'CONTROLLER_CHANGE':
      return state.updateIn(['byId'], (inputByIdMap) => byId(inputByIdMap, action));
  } 
  return state;
}

export default root;
