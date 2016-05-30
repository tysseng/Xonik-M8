import {Map} from 'immutable';

const merge = (state, changes) => Object.assign({}, state, changes);  

const filesystem = (
  state = Map({
    selectedFolder: "" 
  }), 
  action) => {
  switch (action.type){
    case 'SET_STATE':
      return state.merge(action.state.filesystem);
    case 'SELECT_FOLDER':
      return state.set('selectedFolder', action.selectedFolderId);
    default: 
      return state;
  }
}

export default filesystem