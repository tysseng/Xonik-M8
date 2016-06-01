import {Map} from 'immutable';

const merge = (state, changes) => Object.assign({}, state, changes);  

const filedialog = (
  state = Map({
    show: false,
    mode: 'none',
    filename: '',
    root: 'root',
    selectedFolderId: '',
    selectedFileId: ''
  }), 
  action) => {
  
  switch (action.type){
    case 'TOGGLE_FILE_DIALOG':
      if(action.show === false){
        state = state.set('filename', '');
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
        .set('filename', action.filename);
    default: 
      return state;
  }
}

export default filedialog;