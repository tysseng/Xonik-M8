import {Map} from 'immutable';

const merge = (state, changes) => Object.assign({}, state, changes);  

const filesystem = (
  state = Map({
    selectedFolder: "",
    files: Map(),
    folders: Map({
      patches: Map({
        name: 'patches',
        files: Map()
      }),
      inputgroups: Map({
        name: 'Input groups',
        files: Map()
      }),
      inputs: Map({
        name: 'Inputs',
        files: Map()
      })
    })
  }), 
  action) => {
  switch (action.type){
    case 'SET_STATE':
      if(action.state.filesystem){
        return state.merge(action.state.filesystem);
      }
      return state;      
    default: 
      return state;
  }
}

export default filesystem