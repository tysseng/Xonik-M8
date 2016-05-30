// A synthetic filesystem on top of the real filesystem that allows us to add trash and undo without manipulating 
// real files. The directory structure is kept entirely separate from real files, all files are stored inside
// a single folder on the system.

// TODO: Add a "find deleted file" function that lists all previously deleted files and lets the user reinsert them into
// the file system.

// TODO: MAJOR ISSUE - If next file/folder id is in state, and we undo some steps, the id generator will be reversed too.

import {Map, fromJS} from 'immutable';
import _ from 'lodash';

import {saveFAT, loadFAT} from '../core/persistence/fileRepo';

// NB: These are not completely separate but work on the same parts of the 
// state tree.
import files from './files';
import folders from './folders';

const dehydrate = (state) => {
  console.log("Saving filesystem state to disk")
  console.log(JSON.stringify(state, null, '\t'));
  
  saveFAT(state.toJS());

  return state;
}

const rehydrate = () => {
  let state = fromJS(loadFAT());
  console.log("Loaded filesystem state from disk");
  return state;
}

const filesystem = (
  state = Map({
    files: Map(),
    folders: Map(),
    trash: Map({

    }),
    nextFolderId: 0
  }),
  action) => {

  switch(action.type){
    case 'FILESYSTEM_LOAD_FROM_DISK':
      return rehydrate();
    case 'FOLDER_NEW':
    case 'FOLDER_RENAME':
    case 'FOLDER_DELETE':
    case 'FOLDER_MOVE':
      return dehydrate(folders(state, action));
    case 'FILE_NEW':
    case 'FILE_UPDATE':
    case 'FILE_RENAME':
    case 'FILE_MOVE':
    case 'FILE_DELETE':
      return dehydrate(files(state, action));
  }
  return state;
}

export default filesystem;
