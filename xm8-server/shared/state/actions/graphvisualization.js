import { currentVoiceGroupId } from '../voicegroupselector';

export const types = {
  NODE_MOVE: 'NODE_MOVE',
  GRAPH_SET_LINK_FROM: 'GRAPH_SET_LINK_FROM',
  GRAPH_SET_LINK_TO: 'GRAPH_SET_LINK_TO',
  GRAPH_CANCEL_LINK_CREATION: 'GRAPH_CANCEL_LINK_CREATION',
  GRAPH_START_NODE_MOVE: 'GRAPH_START_NODE_MOVE'
}

export const setLinkFromNodeId = (nodeId, patchNumber = currentVoiceGroupId()) => {
  return {
    type: types.GRAPH_SET_LINK_FROM,
    target: 'GUI',
    nodeId,
    patchNumber
  };
}

export const setLinkToNodeId = (nodeId, patchNumber = currentVoiceGroupId()) => {
  return {
    type: types.GRAPH_SET_LINK_TO,
    target: 'GUI',
    nodeId,
    patchNumber
  };
}

export const cancelLinkCreation = (patchNumber = currentVoiceGroupId()) => {
  return {
    type: types.GRAPH_CANCEL_LINK_CREATION,
    target: 'GUI',
    patchNumber
  };
}

export const startNodeMove = (offsetX, offsetY, patchNumber = currentVoiceGroupId()) => {
  return {
    type: types.GRAPH_START_NODE_MOVE,
    target: 'GUI',
    offsetX,
    offsetY,
    patchNumber
  };
}