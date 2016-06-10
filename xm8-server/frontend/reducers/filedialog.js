import {Map} from 'immutable';

const merge = (state, changes) => Object.assign({}, state, changes);  

const filedialog = (
  state = Map({
    show: false,
    showNewFolderDialog: false,
    mode: 'none',
    filename: '',
    root: 'root',
    selectedFolderId: '',
    selectedFileId: '',
    selectedFileVersion: ''
  }), 
  action) => {
  
  switch (action.type){
    case 'TOGGLE_FILE_DIALOG':
      if(action.show === false){
        state = state
        .set('filename', '')
        .set('selectedFolderId', '')
        .set('selectedFileId', '')
        .set('selectedFileVersion', '');
      } else {
        let opts = action.options;
        console.log("Options", action.options)
        if(opts.selectedFolderId) state = state.set('selectedFolderId', opts.selectedFolderId);
        if(opts.selectedFileId) state = state.set('selectedFileId', opts.selectedFileId);
        if(opts.selectedFileVersion) state = state.set('selectedFileVersion', opts.selectedFileVersion);
        if(opts.filename) state = state.set('filename', opts.filename);
      }
      return state
        .set('show', action.show)
        .set('mode', action.mode);
    case 'SET_FILE_DIALOG_FILE_NAME':
      return state.set('filename', action.filename);
    case 'SET_FILE_DIALOG_SELECTED_FOLDER':
      return state.set('selectedFolderId', action.selectedFolderId);
    case 'SET_FILE_DIALOG_SELECTED_FILE':
      return state
        .set('selectedFileId', action.selectedFileId)
        .set('selectedFileVersion', action.selectedFileVersion)
        .set('filename', action.filename);
    case 'FOLDER_DELETE':
      if(state.get('selectedFolderId') === action.folderId){
        return state.set('selectedFolderId', '');
      } 
      return state; 
    case 'TOGGLE_NEW_FOLDER_DIALOG':
      return state.set('showNewFolderDialog', action.show);      
    default: 
      return state;
  }
}

export default filedialog;