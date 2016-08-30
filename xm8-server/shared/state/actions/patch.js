export const types = {
  RESET_PATCH: 'RESET_PATCH'
}

export const resetPatch = () => {
  return {
    type: types.RESET_PATCH,
    target: 'SERVER'
  }
};




