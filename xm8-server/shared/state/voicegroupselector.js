// Singleton store for selected voice group.
// Done this way instead of being put in the redux store to be able to use it actions that are shared between
// front and backend (NB: STATE is not shared, only the object definition).
const currentVoiceGroup = {
  id: '0'
}

export const setCurrentVoiceGroupId = (id) => {
  currentVoiceGroup.id = id;
}
export const currentVoiceGroupId = () => currentVoiceGroup.id;

