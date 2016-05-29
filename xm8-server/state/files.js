import {Map} from 'immutable';
import {findPath} from './folderTools';

const nextFileId = (state) => {
  return 'file' + state.get('nextFileId');
}

const incrementFileId = (state) => {
  let id = state.get('nextFileId');
  return state.set('nextFileId', id+1);
}

const createFile = (id, name, contents) => {
  return Map({
    id,
    name,
    contents
  })
}

const fileNew = (state, action) => {
  let fileId = nextFileId(state);
  state = incrementFileId(state);

  let fileToSave = createFile(fileId, action.fileName, action.fileContents);
  let path = findPath(action.folderId, state).concat(['files']);

  return state.setIn(path, fileId);
}

const fileUpdate = (state, action) => {
  let path = findPath(action.folderId, state).concat(['files', action.fileId, 'contents']);
  return state.setIn(path, action.fileContents);
}

const fileRename = (state, action) => {
  let path = findPath(action.folderId, state).concat(['files', action.fileId, 'name']);
  return state.setIn(path, action.fileName);
}

const fileMove = (state, action) => {
  let fromPath = findPath(action.fromFolderId, state).concat(['files', action.fileId]);
  let toPath = findPath(action.fromFolderId, state).concat(['files', action.fileId]);

  let fileToMove = state.getIn(fromPath);
  return state
    .deleteIn(fromPath)
    .addIn(toPath, fileToMove);
}

const fileDelete = (state, action) => {
  let path = findPath(action.folderId, state).concat(['files', action.fileId]);
  let fileToDelete = state.getIn(path);

  return state
    .deleteIn(path);
    .setIn(['trash', action.fileId], fileToDelete);
}

const files = (state, action) => {
  switch(action.type){
    case 'FILE_NEW':
      return fileNew(state, action);     
    case 'FILE_UPDATE':
      return fileUpdate(state, action);
    case 'FILE_RENAME':
      return fileRename(state, action);
    case 'FILE_MOVE':
      return fileMove(state, action);
    case 'FILE_DELETE':
      return fileDelete(state, action);
  }
  return state;
}

export default files;