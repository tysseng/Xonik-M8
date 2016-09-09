import { Map } from 'immutable';
import { types } from '../../../../shared/state/actions/nodes';
import { types as patchActionTypes} from '../../../../shared/state/actions/patch';
import { types as vizTypes } from '../../../../shared/state/actions/graphvisualization';
import { types as guiTypes } from '../../../../shared/state/actions/graphgui';
import { setCurrentVoiceGroupId } from '../../../../shared/state/voicegroupselector';
import config from '../../../../shared/config';

const emptyState = (() => {
  let patchviews = new Map();
  for(let i=0; i<config.voices.numberOfGroups; i++){
    let patchNumber = '' + i;
    patchviews = patchviews.set(patchNumber, Map({
      selectedNode: "",
      mode: 'default',
      offsetX: 0,
      offsetY: 0,
      linkDialog: Map({
        show: false,
        fromNodeId: '',
        toNodeId: ''
      })
    }));
  }
  patchviews = patchviews.set('selectedPatchNumber', '0');
  return patchviews;
})();


const closeLinkDialog = (state) => {
  return state
    .setIn(['linkDialog', 'fromNodeId'], '')
    .setIn(['linkDialog', 'toNodeId'], '')
    .setIn(['linkDialog', 'show'], false);
}

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
    default:
      return state;
  }
}

const patchviews = (state = emptyState, action) => {
  if(action.patchNumber) {
    return state.updateIn([action.patchNumber], patchviewState => patchview(patchviewState, action));
  } else if(action.type === patchActionTypes.CHANGE_VOICE_GROUP){
    console.log("Patchview", action)
    setCurrentVoiceGroupId(action.voiceGroupId);
    return state.set('selectedPatchNumber', action.voiceGroupId);
  } else {
    return state;
  }
}

export default patchviews