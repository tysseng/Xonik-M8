import { currentVoiceGroupId } from '../voicegroupselector';

export const types = {
  INPUTCONFIG_SELECT_INPUT: 'INPUTCONFIG_SELECT_INPUT'
}

export const selectInput = (inputType, id, patchNumber = currentVoiceGroupId()) => {
  return {
    type: types.INPUTCONFIG_SELECT_INPUT,
    inputType,
    selectedInput: id,
    target: 'GUI',
    patchNumber
  }
}



