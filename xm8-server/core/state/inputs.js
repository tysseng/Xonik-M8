import {OrderedMap, Map, Iterable, fromJS} from 'immutable';
import _ from 'lodash';
import { inputsById, inputGroupsById, getEmptyOption, getStepPositions } from '../../shared/graph/inputs';
import { types as inputActionTypes } from '../../shared/state/actions/inputs';
import { getUndoWrapper } from './undo';
import { groups as undoGroups } from '../../shared/state/actions/undo';
import { getNextInputId } from '../persistence/fileRepo';

const updateOptionsValues = (state, action, field) => {
  let numberOfSteps = state.get('options').size;
  let {centered, endToEnd, min, max} = action;

  // Make sure defaults are used if values are not set or cannot be parsed, 
  if(min === '' || isNaN(min)){
    min = undefined;
  } else {
    min = parseInt(min);
  }

  if(max === '' || isNaN(max)){
    max = undefined;
  } else {
    max = parseInt(max);
  }

  // calculate new values for the current number of options
  let positions = getStepPositions({numberOfSteps, centered, endToEnd, min, max});
  let position = 0;

  // loop over options and update their values
  let options = state.get('options').toJS();
  options = _.sortBy(options, option => option.index);

  _.each(options, option =>{
    let value = field === 'value' ? positions[position].value : positions[position].valuemidi;
    state = state.setIn(['options', option.index, field], value);
    position++;
  })

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
    case inputActionTypes.INPUTCONFIG_SPREAD_OPTIONS_VALUES:
      return updateOptionsValues(state, action, 'value');
    case inputActionTypes.INPUTCONFIG_SPREAD_OPTIONS_VALUES_MIDI:
      return updateOptionsValues(state, action, 'valuemidi');     
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
    case inputActionTypes.INPUTCONFIG_SPREAD_OPTIONS_VALUES: 
    case inputActionTypes.INPUTCONFIG_SPREAD_OPTIONS_VALUES_MIDI:
      return state.updateIn([action.inputId], inputElem => input(inputElem, action));         
  } 
  return state;
}

const root = (
  state = getInitialState(),
  action) => {
  switch(action.type){
    case inputActionTypes.INPUTCONFIG_UPDATE_FIELD:
    case inputActionTypes.INPUTCONFIG_RENAME:        
    case inputActionTypes.INPUTCONFIG_RENAME_SHORT:   
    case inputActionTypes.INPUTCONFIG_DELETE_OPTION:
    case inputActionTypes.INPUTCONFIG_NEW_OPTION:
    case inputActionTypes.INPUTCONFIG_SPREAD_OPTIONS_VALUES:  
    case inputActionTypes.INPUTCONFIG_SPREAD_OPTIONS_VALUES_MIDI:
      // TODO: switch on virtual/physical from input id!
      return state.updateIn(['virtual', 'byId'], (inputByIdMap) => byId(inputByIdMap, action));
  } 
  return state;
}

const getInitialState = () => {
  return Map({
    // physical inputs are global and not affected by patches
    physical: Map({
      byId: fromJS(inputsById)
    }),
    // virtual inputs are per patch and loaded/saved along with a patch
    virtual: Map({
      byId: fromJS(inputsById)
    }),
    // for the time being groups are per patch, but we need default groups
    groups: fromJS(inputGroupsById)
  });
}

const undoableActions = [
  inputActionTypes.CONTROLLER_CHANGE,
  inputActionTypes.INPUTCONFIG_UPDATE_FIELD,
  inputActionTypes.INPUTCONFIG_DELETE_OPTION,
  inputActionTypes.INPUTCONFIG_NEW_OPTION,
  inputActionTypes.INPUTCONFIG_SPREAD_OPTIONS_VALUES,
  inputActionTypes.INPUTCONFIG_SPREAD_OPTIONS_VALUES_MIDI,
];

const undoWrapper = getUndoWrapper(undoGroups.INPUTS, undoableActions, root, getInitialState);

export default undoWrapper;
