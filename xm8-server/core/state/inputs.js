import { Map, fromJS } from 'immutable';
import _ from 'lodash';
import { getUndoWrapper } from './undo';
import { types } from '../../shared/state/actions/inputs';
import { types as patchActionTypes } from '../../shared/state/actions/patch';
import { types as undoActionTypes, groups as undoGroups } from '../../shared/state/actions/undo';
import { panelControllersById } from "../../shared/graph/PanelControllers";
import { inputsById, inputGroupsById, getEmptyOption, getStepPositions, getInput } from '../../shared/graph/inputs';
import { inputTypesById as inputTypes } from "../../shared/inputs/InputTypes";
import { getAutosaved } from '../inputs/physicalInputsRepository';

export const undoableActions = [
  types.CONTROLLER_CHANGE,
  types.INPUTCONFIG_NEW_INPUT,
  types.INPUTCONFIG_DELETE_INPUT,
  types.INPUTCONFIG_UPDATE_FIELD,
  types.INPUTCONFIG_DELETE_OPTION,
  types.INPUTCONFIG_NEW_OPTION,
  types.INPUTCONFIG_SPREAD_OPTIONS_VALUES,
  types.INPUTCONFIG_SPREAD_OPTIONS_VALUES_MIDI,
  types.RESET_PHYSICAL_INPUTS,
  types.RESET_PHYSICAL_INPUT,
  types.LOAD_PHYSICAL_INPUTS_FROM_FILE,
  patchActionTypes.RESET_PATCH
];

export let hasChangedPhysicalInputs = false;

export const clearHasChangedPhysicalInputs = () => {
  hasChangedPhysicalInputs = false;
}

const onChangePhysical = () => {
  hasChangedPhysicalInputs = true;
}

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
    case types.INPUTCONFIG_UPDATE_FIELD:
      return state.setIn(action.fieldPath, action.value);  
    case types.INPUTCONFIG_RENAME:
      return state.setIn(['name', 'full'], action.name);  
    case types.INPUTCONFIG_RENAME_SHORT:
      return state.setIn(['name', 'short'], action.name);
    case types.INPUTCONFIG_DELETE_OPTION:
      return state.deleteIn(['options', action.index]);
    case types.INPUTCONFIG_NEW_OPTION:
      let option = getEmptyOption(state.toJS());      
      return state.setIn(['options', option.index], fromJS(option));
    case types.INPUTCONFIG_SPREAD_OPTIONS_VALUES:
      return updateOptionsValues(state, action, 'value');
    case types.INPUTCONFIG_SPREAD_OPTIONS_VALUES_MIDI:
      return updateOptionsValues(state, action, 'valuemidi');     
  }
  return state;
}

const byId = (state, action) => {
  switch(action.type){
    case types.INPUTCONFIG_NEW_INPUT:
      let newInput = getInput(action.inputId, inputTypes.VERTICAL_RANGE.id, panelControllersById[action.panelControllerId]);
      return state.set(action.inputId, fromJS(newInput));
    case types.INPUTCONFIG_DELETE_INPUT:
      return state.delete(action.inputId);
    case types.RESET_PHYSICAL_INPUT:
      let resetInput = initialPhysicalState.getIn(['byId', action.inputId]);
      return state.set(action.inputId, resetInput);
    case types.INPUTCONFIG_UPDATE_FIELD:
    case types.INPUTCONFIG_RENAME:
    case types.INPUTCONFIG_RENAME_SHORT:
    case types.INPUTCONFIG_DELETE_OPTION:
    case types.INPUTCONFIG_NEW_OPTION:
    case types.INPUTCONFIG_SPREAD_OPTIONS_VALUES:
    case types.INPUTCONFIG_SPREAD_OPTIONS_VALUES_MIDI:
      return state.updateIn([action.inputId], inputElem => input(inputElem, action));         
  } 
  return state;
}

const inputs = (state, action) => {
  switch(action.type){
    case types.INPUTCONFIG_NEW_INPUT:
    case types.INPUTCONFIG_DELETE_INPUT:
    case types.INPUTCONFIG_UPDATE_FIELD:
    case types.INPUTCONFIG_RENAME:
    case types.INPUTCONFIG_RENAME_SHORT:
    case types.INPUTCONFIG_DELETE_OPTION:
    case types.INPUTCONFIG_NEW_OPTION:
    case types.INPUTCONFIG_SPREAD_OPTIONS_VALUES:
    case types.INPUTCONFIG_SPREAD_OPTIONS_VALUES_MIDI:
    case types.RESET_PHYSICAL_INPUT:
      return state.update('byId', inputByIdMap => byId(inputByIdMap, action));
    default:
      return state; 
  }   
}

const getInputType = action => {
  let reducer = 'virtual';
  if(action.inputId){
    reducer = action.inputId.startsWith('virt') ? 'virtual' : 'physical'; 
  }
  return reducer;
}

const initialPhysicalState = Map({
  byId: fromJS(inputsById),
  groups: fromJS(inputGroupsById)
});

const emptyPhysicalState = (() => {
  let autosaved = getAutosaved();
  if(autosaved){
    return autosaved;
  } else {
    return initialPhysicalState;
  }
})();

export const emptyVirtualState = Map({
  byId: Map()
});

// physical inputs reducer
const physicalRoot = (
  state,
  action) => {
  if(getInputType(action) === 'physical'){
    return inputs(state, action);
  } else if(action.type === types.LOAD_PHYSICAL_INPUTS_FROM_FILE) {
    return action.physicalInputs;
  } else if(action.type === types.RESET_PHYSICAL_INPUTS) {
    return emptyPhysicalState;
  }
  return state;
}

export const physicalUndoWrapper = getUndoWrapper({
  undoGroup: undoGroups.PHYSICAL_INPUTS,
  undoableActions: undoableActions,
  reducer: physicalRoot,
  initialState: emptyPhysicalState,
  changeListener: onChangePhysical
});

export const physicalInputs = (state = emptyPhysicalState, action) => {
  if(getInputType(action) === 'physical' ||
     action.type === types.LOAD_PHYSICAL_INPUTS_FROM_FILE ||
     action.type === types.RESET_PHYSICAL_INPUTS ||
     action.type === undoActionTypes.UNDO ||
     action.type === undoActionTypes.REDO) {
    return physicalUndoWrapper(state, action);
  } else {
    return state;
  }
}

// virtual inputs reducer
export const virtualInputs = (state, action) => {
  if(getInputType(action) === 'virtual') {
    if (action.type === patchActionTypes.RESET_PATCH) {
      return emptyVirtualState;
    } else {
      return inputs(state, action);
    }
  }
  return state;
}