import {OrderedMap, Map, Iterable, fromJS} from 'immutable';
import _ from 'lodash';
import {inputsById, inputGroupsById} from '../../shared/matrix/inputs';
import inputActionTypes from '../../shared/state/actions/inputsActionTypes';

//TODO: Put values in separate map

const groups = (state,action) => {

  switch(action.type){
  } 
  return state;
}

const input = (state, action) => {
  switch(action.type){
    case inputActionTypes.INPUTCONFIG_RENAME:       
      return state.setIn(['name', 'full'], action.name);  
    case inputActionTypes.INPUTCONFIG_RENAME_SHORT:
      return state.setIn(['name', 'short'], action.name);  
  }
  return state;
}

const byId = (state, action) => {
  switch(action.type){
    case inputActionTypes.INPUTCONFIG_RENAME:        
    case inputActionTypes.INPUTCONFIG_RENAME_SHORT:
      return state.updateIn([action.inputId], inputElem => input(inputElem, action)); 
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
    case inputActionTypes.INPUTCONFIG_RENAME:        
    case inputActionTypes.INPUTCONFIG_RENAME_SHORT:
      return state.updateIn(['byId'], (inputByIdMap) => byId(inputByIdMap, action));
  } 
  return state;
}

export default root;
