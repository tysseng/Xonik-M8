export const types = {
  RESET_PATCH: 'RESET_PATCH',
  LOAD_PATCH_FROM_FILE: 'LOAD_PATCH_FROM_FILE',
}

export const resetPatch = () => {
  return {
    type: types.RESET_PATCH,
    target: 'SERVER'
  }
};

export const loadPatchFromFile = (
  patchNumber, fileId, version,
  patch, controllers) => {
  return {
    type: types.LOAD_PATCH_FROM_FILE,
    target: 'SERVER',
    patchNumber,
    fileId,
    version,
    patch,
    controllers
  }
};



