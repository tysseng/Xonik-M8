// A synthetic filesystem on top of the real filesystem that allows us to add trash and undo without manipulating 
// real files. The directory structure is kept entirely separate from real files, all files are stored inside
// a single folder on the system.

// TODO: Add a "find deleted file" function that lists all previously deleted files and lets the user reinsert them into
// the file system.

// TODO: MAJOR ISSUE - If next file/folder id is in state, and we undo some steps, the id generator will be reversed too.

import {List, Map, OrderedMap} from 'immutable';
import _ from 'lodash';

// NB: These are not completely separate but work on the same parts of the 
// state tree.
import files from './files';
import folders from './folders';

const persist = (state) => {
  console.log("Persisting")
  console.log(JSON.stringify(state, null, '\t'));
  // persist
  return state;
}

const filesystem = (
  state = Map({
    files: Map(),
    folders: Map(),
    folderPaths: Map(),
    trash: Map({

    }),
    nextFolderId: 0
  }),
  action) => {

  switch(action.type){
    case 'FOLDER_NEW':
    case 'FOLDER_RENAME':
    case 'FOLDER_DELETE':
    case 'FOLDER_MOVE':
      return persist(folders(state, action));
    case 'FILE_NEW':
    case 'FILE_RENAME':
    case 'FILE_MOVE':
    case 'FILE_DELETE':
      return persist(files(state, action));
  }
  return state;
}

export default filesystem;
