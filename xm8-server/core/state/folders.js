import {Map} from 'immutable';
import _ from 'lodash';

import { findPath } from '../../shared/filesystem/fileTools';

const nextFolderId = (state) => {
  return 'folder' + state.get('nextFolderId');
}

const incrementFolderId = (state) => {
  let id = state.get('nextFolderId');
  return state.set('nextFolderId', id+1);
}

const createFolder = (id, name, parent) => {
  return Map({
    id,
    name,
    parent,
    folders: Map(),
    files: Map()
  })
}


const folderNew = (state, action) => {
  let folderId = nextFolderId(state);
  state = incrementFolderId(state);

  let newFolder = createFolder(folderId, action.folderName, action.folderParentId);

  if(action.folderParentId){
    let pathToParent = findPath(action.folderParentId, state);
    return state.setIn(pathToParent.concat(['folders', newFolder.get('id')]), newFolder);
  } else {
    // top level folders
    return state.setIn(['folders', folderId], newFolder);
  }
}

const folderRename = (state, action) => {
  let path = findPath(action.folderId, state);
  return state.updateIn(path.concat(['name']), action.folderName);      
}

const folderDelete = (state, action) => {           
  let path = findPath(action.folderId, state);
  console.log(path);
  let folderToDelete = state.getIn(path);  

  if(folderToDelete.get('parent')){
    state = state
      .deleteIn(path)
      .setIn(['trash', action.folderId], folderToDelete);
  }

  return state;
}

const folderMove = (state, action) => {
  let path = findPath(action.folderId, state);  
  let toPath = findPath(action.toFolderId, state);
  let folderToMove = state.getIn(state);

  return state
    .deleteIn(path)
    .setIn(toPath, folderToMove);
}

const folders = (state, action) => {
  switch(action.type){
    case 'FOLDER_NEW':
      return folderNew(state, action);
    case 'FOLDER_RENAME':
      return folderRename(state, action);
    case 'FOLDER_DELETE':
      return folderDelete(state, action);
    case 'FOLDER_MOVE':
      return folderMove(state, action);
  } 
  return state;
}

export default folders;