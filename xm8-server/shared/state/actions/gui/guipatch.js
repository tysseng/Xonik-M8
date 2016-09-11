export const types = {
  CHANGE_VOICE_GROUP: 'CHANGE_VOICE_GROUP'
}

export const changeVoiceGroup = (voiceGroupId) => {
  return {
    type: types.CHANGE_VOICE_GROUP,
    target: 'GUI',
    voiceGroupId
  };
}


