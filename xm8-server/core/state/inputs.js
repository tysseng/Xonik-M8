import {OrderedMap, Map, Iterable, fromJS} from 'immutable';
import _ from 'lodash';
import { inputsById, inputGroupsById, getEmptyOption, getStepPositions } from '../../shared/graph/inputs';
import { types as inputActionTypes } from '../../shared/state/actions/inputs';
import { types as nodeActionTypes } from '../../shared/state/actions/nodes';
import { getUndoWrapper } from './undo';
import { groups as undoGroups, types as undoTypes } from '../../shared/state/actions/undo';
import { panelControllersById } from "../../shared/graph/PanelControllers";
import { getInput } from "../../shared/graph/Inputs";

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
    case inputActionTypes.INPUTCONFIG_NEW_INPUT:
      let newInput = getInput(action.inputId, 'VERTICAL_RANGE', panelControllersById[action.panelControllerId]);
      return state.set(action.inputId, fromJS(newInput));
    case inputActionTypes.INPUTCONFIG_DELETE_INPUT:
      return state.delete(action.inputId);
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

const inputs = (state, action) => {
  switch(action.type){
    case inputActionTypes.INPUTCONFIG_NEW_INPUT:
    case inputActionTypes.INPUTCONFIG_DELETE_INPUT:    
    case inputActionTypes.INPUTCONFIG_UPDATE_FIELD:
    case inputActionTypes.INPUTCONFIG_RENAME:        
    case inputActionTypes.INPUTCONFIG_RENAME_SHORT:   
    case inputActionTypes.INPUTCONFIG_DELETE_OPTION:
    case inputActionTypes.INPUTCONFIG_NEW_OPTION:
    case inputActionTypes.INPUTCONFIG_SPREAD_OPTIONS_VALUES:  
    case inputActionTypes.INPUTCONFIG_SPREAD_OPTIONS_VALUES_MIDI:  
      return state.update('byId', inputByIdMap => byId(inputByIdMap, action));
    default:
      return state; 
  }   
}

const getInputType = action => {
  let reducer = 'virtual'
  if(action.inputId){
    reducer = action.inputId.startsWith('virt') ? 'virtual' : 'physical'; 
  }
  return reducer;
}

const getInitialPhysicalState = () => {
  return Map({
    byId: fromJS(inputsById),
    groups: fromJS(inputGroupsById)
  })  
}

const getInitialVirtualState = () => {
  return Map({
    byId: Map()
  })  
}

// physical inputs reducer
const physicalRoot = (
  state = getInitialPhysicalState(),
  action) => {
  if(getInputType(action) === 'physical'){
    return inputs(state, action);
  }
  return state;
}

// virtual inputs reducer
const virtualRoot = (
  state = getInitialVirtualState(),
  action) => {
  if(getInputType(action) === 'virtual'){
    if(action.type === nodeActionTypes.LOAD_PATCH_FROM_FILE){
      return action.virtualInputs;
    } else {
      return inputs(state, action);
    }
  }
  return state;
}

const undoableActions = [
  inputActionTypes.CONTROLLER_CHANGE,
  inputActionTypes.INPUTCONFIG_NEW_INPUT,
  inputActionTypes.INPUTCONFIG_DELETE_INPUT,
  inputActionTypes.INPUTCONFIG_UPDATE_FIELD,
  inputActionTypes.INPUTCONFIG_DELETE_OPTION,
  inputActionTypes.INPUTCONFIG_NEW_OPTION,
  inputActionTypes.INPUTCONFIG_SPREAD_OPTIONS_VALUES,
  inputActionTypes.INPUTCONFIG_SPREAD_OPTIONS_VALUES_MIDI,
];

export const virtualInputs = getUndoWrapper(undoGroups.VIRTUAL_INPUTS, undoableActions, virtualRoot, getInitialVirtualState);
export const physicalInputs = getUndoWrapper(undoGroups.PHYSICAL_INPUTS, undoableActions, physicalRoot, getInitialPhysicalState);