import types from './inputsActionTypes';

export const changeValue = (id, value) => {
  return {
    type: types.CONTROLLER_CHANGE,
    id,
    value,
    target: 'BOTH',
    undoDescription: 'Change value'    
  };  
}

export const selectInput = (id) => {
  return {
    type: types.INPUTCONFIG_SELECT_INPUT,
    selectedInput: id,
    target: 'FRONTEND'
  }
}

export const rename = (inputId, name) => {
  return {
    type: types.INPUTCONFIG_RENAME,
    inputId,
    name,
    target: 'SERVER'
  }
}

export const renameShort = (inputId, name) => {
  return {
    type: types.INPUTCONFIG_RENAME_SHORT,
    inputId,
    name,
    target: 'SERVER'
  }
}

export const updateField = (inputId, fieldPath, value) => {
  return {
    type: types.INPUTCONFIG_UPDATE_FIELD,
    inputId,
    fieldPath,
    value,
    target: 'SERVER',
    undoDescription: 'Update field'
  }
}

export const deleteOption = (inputId, index) => {
  return {
    type: types.INPUTCONFIG_DELETE_OPTION,
    inputId,
    index,
    target: 'SERVER',
    undoDescription: 'Delete option'
  }
}

export const newOption = (inputId) => {
  return {
    type: types.INPUTCONFIG_NEW_OPTION,
    inputId,
    target: 'SERVER',
    undoDescription: 'New option'
  }
}

export const spreadOptionValues = (inputId, centered, endToEnd, min, max) => {
  return {
    type: types.INPUTCONFIG_SPREAD_OPTIONS_VALUES,
    inputId,
    centered, 
    endToEnd,
    min, 
    max,
    target: 'SERVER',
    undoDescription: 'Spread option values'
  }
}

export const spreadOptionValuesMidi = (inputId, centered, endToEnd) => {
  return {
    type: types.INPUTCONFIG_SPREAD_OPTIONS_VALUES_MIDI,
    inputId,
    centered, 
    endToEnd,
    includeNegative,
    target: 'SERVER',
    undoDescription: 'Spread midi values'
  }
}





