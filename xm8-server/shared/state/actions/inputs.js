export const types = {
  CONTROLLER_CHANGE: 'CONTROLLER_CHANGE',
  INPUTCONFIG_NEW_INPUT: 'INPUTCONFIG_NEW_INPUT',
  INPUTCONFIG_DELETE_INPUT: 'INPUTCONFIG_DELETE_INPUT',
  INPUTCONFIG_RENAME: 'INPUTCONFIG_RENAME',
  INPUTCONFIG_RENAME_SHORT: 'INPUTCONFIG_RENAME_SHORT',
  INPUTCONFIG_UPDATE_FIELD: 'INPUTCONFIG_UPDATE_FIELD',
  INPUTCONFIG_UPDATE_PANEL_CONTROLLER: 'INPUTCONFIG_UPDATE_PANEL_CONTROLLER',
  INPUTCONFIG_DELETE_OPTION: 'INPUTCONFIG_DELETE_OPTION',
  INPUTCONFIG_NEW_OPTION: 'INPUTCONFIG_NEW_OPTION',
  INPUTCONFIG_SPREAD_OPTIONS_VALUES: 'INPUTCONFIG_SPREAD_OPTIONS_VALUES',
  INPUTCONFIG_SPREAD_OPTIONS_VALUES_MIDI: 'INPUTCONFIG_SPREAD_OPTIONS_VALUES_MIDI',
  INPUTCONFIG_UPDATE_POSITIONS_FOR_VIRTUAL: 'INPUTCONFIG_UPDATE_POSITIONS_FOR_VIRTUAL',
  INPUT_DIRECT_OUTPUT_TOGGLE: 'INPUT_DIRECT_OUTPUT_TOGGLE',
  LOAD_PHYSICAL_INPUTS_FROM_FILE: 'LOAD_PHYSICAL_INPUTS_FROM_FILE',
  RESET_PHYSICAL_INPUTS: 'RESET_PHYSICAL_INPUTS',
  RESET_PHYSICAL_INPUT: 'RESET_PHYSICAL_INPUT',
  RESET_VIRTUAL_INPUT: 'RESET_VIRTUAL_INPUT'
}

// It is only possible to create new inputs, so virt is hard coded as part of the id 
export const newInput = (inputId, panelControllerId, patchNumber = '-') => {

  return {
    type: types.INPUTCONFIG_NEW_INPUT,
    inputId,
    panelControllerId,
    target: 'SERVER',
    undoDescription: 'New input',
    patchNumber
  }
}

export const deleteInput = (inputId, patchNumber = '-') => {
  return {
    type: types.INPUTCONFIG_DELETE_INPUT,
    inputId,
    target: 'SERVER',
    undoDescription: 'Delete input',
    patchNumber
  }
}

export const changeValue = (id, value, patchNumber = '-') => {
  return {
    type: types.CONTROLLER_CHANGE,
    id,
    value,
    target: 'BOTH',
    undoDescription: 'Change value',
    patchNumber
  };  
}

export const rename = (inputId, name, patchNumber = '-') => {
  return {
    type: types.INPUTCONFIG_RENAME,
    inputId,
    name,
    target: 'SERVER',
    patchNumber
  }
}

export const renameShort = (inputId, name, patchNumber = '-') => {
  return {
    type: types.INPUTCONFIG_RENAME_SHORT,
    inputId,
    name,
    target: 'SERVER',
    patchNumber
  }
}

export const updatePanelController = (inputId, panelControllerId, patchNumber = '-') => {
  return {
    type: types.INPUTCONFIG_UPDATE_PANEL_CONTROLLER,
    inputId,
    panelControllerId,
    target: 'SERVER',
    undoDescription: 'Update panel controller',
    patchNumber
  }
}

export const updateField = (inputId, fieldPath, value, patchNumber = '-') => {
  return {
    type: types.INPUTCONFIG_UPDATE_FIELD,
    inputId,
    fieldPath,
    value,
    target: 'SERVER',
    undoDescription: 'Update field',
    patchNumber
  }
}

export const deleteOption = (inputId, index, patchNumber = '-') => {
  return {
    type: types.INPUTCONFIG_DELETE_OPTION,
    inputId,
    index,
    target: 'SERVER',
    undoDescription: 'Delete option',
    patchNumber
  }
}

export const newOption = (inputId, patchNumber = '-') => {
  return {
    type: types.INPUTCONFIG_NEW_OPTION,
    inputId,
    target: 'SERVER',
    undoDescription: 'New option',
    patchNumber
  }
}

export const spreadOptionValues = (inputId, centered, endToEnd, min, max, patchNumber = '-') => {
  return {
    type: types.INPUTCONFIG_SPREAD_OPTIONS_VALUES,
    inputId,
    centered, 
    endToEnd,
    min, 
    max,
    target: 'SERVER',
    undoDescription: 'Spread option values',
    patchNumber
  }
}

export const spreadOptionValuesMidi = (inputId, centered, endToEnd, patchNumber = '-') => {
  return {
    type: types.INPUTCONFIG_SPREAD_OPTIONS_VALUES_MIDI,
    inputId,
    centered, 
    endToEnd,
    target: 'SERVER',
    undoDescription: 'Spread midi values',
    patchNumber
  }
}

export const toggleDirectOutput = (inputId, outputId, patchNumber = '-') => {
  return {
    type: types.INPUT_DIRECT_OUTPUT_TOGGLE,
    inputId,
    outputId,
    target: 'SERVER',
    patchNumber
  }
}

export const loadPhysicalInputsFromFile = (fileId, version, physicalInputs, patchNumber = '-') => {
  return {
    type: types.LOAD_PHYSICAL_INPUTS_FROM_FILE,
    target: 'SERVER',
    fileId,
    version,
    physicalInputs,
    patchNumber
  }
};

export const resetPhysicalInputs = (patchNumber = '-') => {
  return {
    type: types.RESET_PHYSICAL_INPUTS,
    target: 'SERVER',
    patchNumber
  }
};

export const resetPhysicalInput = (inputId, patchNumber = '-') => {
  return {
    type: types.RESET_PHYSICAL_INPUT,
    inputId,
    target: 'SERVER',
    patchNumber
  }
};

export const updateVirtualInputPositions = (virtualInputPositions, patchNumber = '-') => {
  return {
    type: types.INPUTCONFIG_UPDATE_POSITIONS_FOR_VIRTUAL,
    virtualInputPositions,
    target: 'SERVER',
    patchNumber
  }
};



