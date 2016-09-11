import { currentVoiceGroupId } from '../voicegroupselector';

export const types = {
  DIRECT_OUTPUT_TOGGLE: 'DIRECT_OUTPUT_TOGGLE',
  RESET_MATRIX: 'RESET_MATRIX'
}

export const toggleDirectOutput = (inputId, outputId, patchNumber = currentVoiceGroupId()) => {
  return {
    type: types.DIRECT_OUTPUT_TOGGLE,
    inputId,
    outputId,
    target: 'BOTH',
    patchNumber
  }
}

export const resetMatrix = (patchNumber = currentVoiceGroupId()) => {
  return {
    type: types.RESET_MATRIX,
    target: 'SERVER',
    patchNumber
  }
};




