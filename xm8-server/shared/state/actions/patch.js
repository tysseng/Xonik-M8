export const types = {
  RESET_PATCH: 'RESET_PATCH',
  LOAD_PATCH_FROM_FILE: 'LOAD_PATCH_FROM_FILE',
  SET_LOADED_PATCH_FILE_DETAILS: 'SET_LOADED_PATCH_FILE_DETAILS',
  TOGGLE_AUTO_UPDATE: 'TOGGLE_AUTO_UPDATE'
}

export const resetPatch = () => {
  return {
    type: types.RESET_PATCH,
    target: 'BOTH'
  }
};

// Called whenever a file is loaded
export const loadPatchFromFile = ({fileId, version, filename, folderId, patchNumber, patch, controllers}) => {
  return {
    type: types.LOAD_PATCH_FROM_FILE,
    target: 'SERVER',
    patchNumber,
    fileId,
    version,
    filename,
    folderId,
    patch,
    controllers
  }
};

// Called when saving a file, updates any info about currently loaded
// file
export const setLoadedPatchFileDetails = ({fileId, version, filename, folderId, patchNumber}) => {
  return {
    type: types.SET_LOADED_PATCH_FILE_DETAILS,
    target: 'SERVER',
    fileId,
    version,
    filename,
    folderId,
    patchNumber
  };
};

