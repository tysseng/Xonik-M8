import { Map } from 'immutable';
import { types } from '../../shared/state/actions/nodes';
import { types as vizTypes } from '../../shared/state/actions/graphvisualization';
import { types as guiTypes } from '../../shared/state/actions/graphgui';

const merge = (state, changes) => Object.assign({}, state, changes);  

const patchview = (
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
    case types.TOGGLE_PATCH_FILE_DIALOG:
      return state.setIn(['patchFileDialog', 'show'], action.show).setIn(['patchFileDialog', 'mode'], action.mode);
    case types.DELETE_NODE:
      if(state.get('selectedNode') === action.nodeId){
        return state.set('selectedNode', '');
      }
      return state; 
    case types.DELETE_LINK:
      if(state.get('selectedLink') === action.linkId){
        return state.set('selectedLink', '');
      }
      return state; 
    case types.SELECT_NODE: 
      return state.set("selectedLink", "").set("selectedNode", action.nodeId);
    case types.SELECT_LINK: 
      return state.set("selectedNode", "").set("selectedLink", action.linkId);      
    case vizTypes.GRAPH_START_NODE_MOVE:    
      return state.set('offsetX', action.offsetX).set('offsetY', action.offsetY);
    case guiTypes.GRAPH_TOGGLE_MODE:
      if(action.mode != 'create_link'){
        state = closeLinkDialog(state);        
      }
      return state.set('mode', action.mode);
    case vizTypes.GRAPH_SET_LINK_FROM:
      return state.setIn(['linkDialog', 'fromNodeId'], action.nodeId);
    case vizTypes.GRAPH_SET_LINK_TO:
      return state.setIn(['linkDialog', 'toNodeId'], action.nodeId).setIn(['linkDialog', 'show'], true);
    case vizTypes.GRAPH_CANCEL_LINK_CREATION:
      return closeLinkDialog(state);
    case types.NEW_LINK:
      return closeLinkDialog(state);
    case types.SET_STATE:
      if(action.state.patchview){
        return state.merge(action.state.patchview);
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

export default patchview