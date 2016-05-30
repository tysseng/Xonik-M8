export const loadFilesystem = () => {
  return {
    type: 'FILESYSTEM_LOAD_FROM_DISK',
    target: 'SERVER'
  }  
}

export const selectFolder = (selectedFolderId) => {
  return {
    type: 'SELECT_FOLDER',
    target: 'GUI',    
    selectedFolderId
  }  
}

export const newFolder = (name, parentId) => {
  return {
    type: 'FOLDER_NEW',
    target: 'SERVER',
    folderName: name,
    folderParentId: parentId
  };
}

export const renameFolder = (id, name) => {
  return {
    type: 'FOLDER_RENAME',
    target: 'SERVER',
    folderName: name,
    folderId: id
  };
}

export const deleteFolder = (id) => {
  return {
    type: 'FOLDER_DELETE',
    target: 'SERVER',
    folderId: id
  };
}

export const moveFolder = (id, toId) => {
  return {
    type: 'FOLDER_MOVE',
    target: 'SERVER',
    folderId: id,
    toFolderId: toId
  };
}

export const newFile = (fileId, fileVersion, fileName, folderId) => {
  return {
    type: 'FILE_NEW',
    target: 'SERVER',
    fileId,
    fileVersion,
    fileName,
    folderId
  };
}

export const updateFile = (fileId, fileVersion, folderId) => {
  return {
    type: 'FILE_UPDATE',
    target: 'SERVER',
    fileId,
    fileVersion,
    folderId
  };
}

export const renameFile = (fileId, fileName) => {
  return {
    type: 'FILE_RENAME',
    target: 'SERVER',
    fileId,
    fileName,
  };
}

export const moveFile = (id, from, to) => {
  return {
    type: 'FILE_MOVE',
    target: 'SERVER',
    fileId: id,
    fromFolderId: from,
    toFolderId: to
  };
}

export const deleteFile = (id, folderId) => {
  return {
    type: 'FILE_DELETE',
    target: 'SERVER',
    fileId: id,
    folderId
  };
}