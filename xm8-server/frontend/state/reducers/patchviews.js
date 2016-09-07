import { Map } from 'immutable';
import { types } from '../../../shared/state/actions/nodes';
import { types as vizTypes } from '../../../shared/state/actions/graphvisualization';
import { types as guiTypes } from '../../../shared/state/actions/graphgui';
import { getUpdatedState, getPatchNum } from './reducerTools';
import config from '../../../shared/config';

const emptyState = (() => {
  let controllers = new Map();
  for(let i=0; i<config.voices.numberOfGroups; i++){
    let patchNumber = '' + i;
    controllers = controllers.set(patchNumber, Map({
      "selectedNode": "",
      "mode": 'default',
      "shouldAutoUpdate": false,
      offsetX: 0,
      offsetY: 0,
      linkDialog: Map({
        show: false,
        fromNodeId: '',
        toNodeId: ''
      })
    }));
  }
  return controllers;
})();

const patchview = (state, action) => {
  switch (action.type){
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
    case 'SET_STATE':
      let updatedState = getUpdatedState(['patchviews', '0'], action);
      console.log("Set state for patcview", action)
      if(updatedState){
        return state.merge(updatedState);
      }
      return state;
    default: 
      return state;
  }
}

const patchviews = (state = emptyState, action) => {
  if(action.patchNumber) {
    return state.updateIn([action.patchNumber], patchviewState => patchview(patchviewState, action));
  } else if(action.type === 'SET_STATE') {
    for(let i=0; i<config.voices.numberOfGroups; i++) {
      if (getUpdatedState(['patchviews', getPatchNum(i)], action)) {
        state = state.updateIn([getPatchNum(i)], patchviewState => patchview(patchviewState, action));
      }
    }
    return state;
  } else {
    return state;
  }
}

const closeLinkDialog = (state) => {
  return state
    .setIn(['linkDialog', 'fromNodeId'], '')
    .setIn(['linkDialog', 'toNodeId'], '')
    .setIn(['linkDialog', 'show'], false);  
}

export default patchviews