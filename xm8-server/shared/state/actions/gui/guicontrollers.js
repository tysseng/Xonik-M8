export const types = {
  SELECT_CONTROL_GROUP: 'SELECT_CONTROL_GROUP'
}

export const selectControllerGroup = (selectedGroupId, patchNumber = '-') => {
  return {
    type: types.SELECT_CONTROL_GROUP,
    selectedGroupId,
    target: 'GUI',
    patchNumber
  }
}