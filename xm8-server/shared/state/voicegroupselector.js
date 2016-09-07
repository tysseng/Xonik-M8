// Singleton store for selected voice group.
// Done this way instead of being put in the redux store to be able to use it front and backend (separately)
const currentVoiceGroup = {
  id: '0'
}

export const setCurrentVoiceGroupId = (id) => {
  currentVoiceGroup.id = id;
}
export const currentVoiceGroupId = () => currentVoiceGroup.id;

