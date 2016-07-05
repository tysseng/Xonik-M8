import {OrderedMap, Map, Iterable, fromJS} from 'immutable';
import _ from 'lodash';
import {inputsById, inputGroupsById, getEmptyOption} from '../../shared/matrix/inputs';
import inputActionTypes from '../../shared/state/actions/inputsActionTypes';

const groups = (state,action) => {

  switch(action.type){
  } 
  return state;
}

const input = (state, action) => {
  switch(action.type){
    case inputActionTypes.INPUTCONFIG_UPDATE_FIELD:
      return state.setIn(action.fieldPath, action.value);  
    case inputActionTypes.INPUTCONFIG_RENAME:       
      return state.setIn(['name', 'full'], action.name);  
    case inputActionTypes.INPUTCONFIG_RENAME_SHORT:
      return state.setIn(['name', 'short'], action.name);
    case inputActionTypes.INPUTCONFIG_DELETE_OPTION:      
      return state.deleteIn(['options', action.index]);
    case inputActionTypes.INPUTCONFIG_NEW_OPTION:   
      let option = getEmptyOption(state.toJS());   
      return state.setIn(['options', option.index], fromJS(option));
  }
  return state;
}

const byId = (state, action) => {
  switch(action.type){
    case inputActionTypes.INPUTCONFIG_UPDATE_FIELD:
    case inputActionTypes.INPUTCONFIG_RENAME:        
    case inputActionTypes.INPUTCONFIG_RENAME_SHORT:
    case inputActionTypes.INPUTCONFIG_DELETE_OPTION:    
    case inputActionTypes.INPUTCONFIG_NEW_OPTION:    
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
    case inputActionTypes.INPUTCONFIG_UPDATE_FIELD:
    case inputActionTypes.INPUTCONFIG_RENAME:        
    case inputActionTypes.INPUTCONFIG_RENAME_SHORT:   
    case inputActionTypes.INPUTCONFIG_DELETE_OPTION:
    case inputActionTypes.INPUTCONFIG_NEW_OPTION:    
      return state.updateIn(['byId'], (inputByIdMap) => byId(inputByIdMap, action));
  } 
  return state;
}

export default root;
