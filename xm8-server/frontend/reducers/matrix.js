import {Map} from 'immutable';

const merge = (state, changes) => Object.assign({}, state, changes);  

const matrix = (
  state = Map({
    "selectedNode": "",
    "mode": 'default',
    "shouldAutoUpdate": false,
    linkFromNodeId: '',
    linkToNodeId: '',
    patchFileDialog: Map({
      show: false,
      mode: 'none'
    })
  }), 
  action) => {
  
  switch (action.type){
    case 'TOGGLE_PATCH_FILE_DIALOG':
      return state.setIn(['patchFileDialog', 'show'], action.show).setIn(['patchFileDialog', 'mode'], action.mode);
    case 'DELETE_NODE':
      if(state.get('selectedNode') === action.nodeId){
        return state.set('selectedNode', '');
      }
      return state; 
    case 'DELETE_LINK':
      if(state.get('selectedLink') === action.linkId){
        return state.set('selectedLink', '');
      }
      return state; 
    case 'SELECT_NODE': 
      return state.set("selectedLink", "").set("selectedNode", action.nodeId);
    case 'SELECT_LINK': 
      return state.set("selectedNode", "").set("selectedLink", action.linkId);      
    case 'MATRIX_TOGGLE_MODE':
      return state.set('mode', action.mode);
    case 'MATRIX_SET_LINK_FROM':
      return state.set('linkFromNodeId', action.nodeId);
    case 'MATRIX_SET_LINK_TO':
      return state.set('linkToNodeId', action.nodeId);
    case 'MATRIX_CANCEL_LINK_CREATION':
      return state.set('linkToNodeId', '').set('linkFromNodeId', '');
    case 'SET_STATE':
      return state.merge(action.state.matrix);
    default: 
      return state;
  }
}

export default matrix