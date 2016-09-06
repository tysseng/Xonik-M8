export const types = {
  RESET_PATCH: 'RESET_PATCH',
  LOAD_PATCH_FROM_FILE: 'LOAD_PATCH_FROM_FILE',
  SET_LOADED_PATCH_FILE_DETAILS: 'SET_LOADED_PATCH_FILE_DETAILS'
}

export const resetPatch = () => {
  return {
    type: types.RESET_PATCH,
    target: 'BOTH'
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

export const setLoadedPatchFileDetails = (fileId, version) => {
  return {
    type: types.SET_LOADED_PATCH_FILE_DETAILS,
    target: 'SERVER',
    fileId,
    version
  };
};


