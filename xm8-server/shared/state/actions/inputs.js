import types from './inputsActionTypes';


export const changeValue = (id, value) => {
  return {
    type: types.CONTROLLER_CHANGE,
    id,
    value,
    target: 'BOTH'
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

export const updateMidiReceiveStatus = (inputId, value) => {
  return {
    type: types.INPUTCONFIG_UPDATE_MIDI_RECEIVE_STATUS,
    inputId,
    value,
    target: 'SERVER'
  }
}

export const updateMidiReceiveData1 = (inputId, value) => {
  return {
    type: types.INPUTCONFIG_UPDATE_MIDI_RECEIVE_DATA_1,
    inputId,
    value,
    target: 'SERVER'
  }
}

export const updateMidiTransmitStatus = (inputId, value) => {
  return {
    type: types.INPUTCONFIG_UPDATE_MIDI_TRANSMIT_STATUS,
    inputId,
    value,
    target: 'SERVER'
  }
}

export const updateMidiTransmitData1 = (inputId, value) => {
  return {
    type: types.INPUTCONFIG_UPDATE_MIDI_TRANSMIT_DATA_1,
    inputId,
    value,
    target: 'SERVER'
  }
}

export const updateMidiTransmitResolution = (inputId, value) => {
  return {
    type: types.INPUTCONFIG_UPDATE_MIDI_TRANSMIT_HIRES,
    inputId,
    value,
    target: 'SERVER'
  }
}

export const updateMidiReceiveResolution = (inputId, value) => {
  return {
    type: types.INPUTCONFIG_UPDATE_MIDI_RECEIVE_HIRES,
    inputId,
    value,
    target: 'SERVER'
  }
}

