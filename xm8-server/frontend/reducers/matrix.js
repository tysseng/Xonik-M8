import {Map} from 'immutable';

const merge = (state, changes) => Object.assign({}, state, changes);  

const matrix = (
  state = Map({
    "selectedNode": "",
    "mode": 'default',
    "shouldAutoUpdate": false,
    offsetX: 0,
    offsetY: 0,
    linkDialog: Map({
      show: false,
      fromNodeId: '',
      toNodeId: ''
    }),
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
    case 'MATRIX_START_NODE_MOVE':
      return state.set('offsetX', action.offsetX).set('offsetY', action.offsetY);
    case 'MATRIX_TOGGLE_MODE':
      if(action.mode != 'create_link'){
        state = closeLinkDialog(state);        
      }
      return state.set('mode', action.mode);
    case 'MATRIX_SET_LINK_FROM':
      return state.setIn(['linkDialog', 'fromNodeId'], action.nodeId);
    case 'MATRIX_SET_LINK_TO':
      return state.setIn(['linkDialog', 'toNodeId'], action.nodeId).setIn(['linkDialog', 'show'], true);
    case 'MATRIX_CANCEL_LINK_CREATION':
      return closeLinkDialog(state);
    case 'NEW_LINK':
      return closeLinkDialog(state);
    case 'SET_STATE':
      if(action.state.matrix){
        return state.merge(action.state.matrix);
      }
      return state;      
    default: 
      return state;
  }
}

const closeLinkDialog = (state) => {
  return state
    .setIn(['linkDialog', 'fromNodeId'], '')
    .setIn(['linkDialog', 'toNodeId'], '')
    .setIn(['linkDialog', 'show'], false);  
}

export default matrix