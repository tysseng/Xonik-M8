import { currentVoiceGroupId } from '../../voicegroupselector';

export const types = {
  DIRECT_OUTPUT_HOVER: 'DIRECT_OUTPUT_HOVER'
}

export const toggleHover = (inputId, outputId, patchNumber = currentVoiceGroupId()) => {
  return {
    type: types.DIRECT_OUTPUT_HOVER,
    inputId,
    outputId,
    target: 'GUI',
    patchNumber
  }
}




