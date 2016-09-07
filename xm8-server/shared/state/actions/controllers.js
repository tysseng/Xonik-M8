import { currentVoiceGroupId } from '../voicegroupselector';

export const types = {
  SELECT_CONTROL_GROUP: 'SELECT_CONTROL_GROUP'
}

export const selectControllerGroup = (selectedGroupId, patchNumber = currentVoiceGroupId()) => {
  return {
    type: types.SELECT_CONTROL_GROUP,
    selectedGroupId,
    target: 'GUI',
    patchNumber
  }
}