import {Map} from 'immutable';
import {findPath} from '../../shared/filesystem/fileTools';

const createFile = (id, version, name) => {
  return Map({
    id,
    version,
    name
  })
}

const fileNew = (state, action) => {
  let fileToSave = createFile(action.fileId, action.fileVersion, action.fileName);
  let path = findPath(action.folderId, state).concat(['files', action.fileId]);

  return state.setIn(path, fileToSave);
}

const fileUpdate = (state, action) => {
  let path = findPath(action.folderId, state).concat(['files', action.fileId, 'version']);
  return state.setIn(path, action.fileVersion);
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
    .deleteIn(path)
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