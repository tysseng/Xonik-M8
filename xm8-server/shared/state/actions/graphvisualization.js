export const types = {
  NODE_MOVE: 'NODE_MOVE',
  GRAPH_SET_LINK_FROM: 'GRAPH_SET_LINK_FROM',
  GRAPH_SET_LINK_TO: 'GRAPH_SET_LINK_TO',
  GRAPH_CANCEL_LINK_CREATION: 'GRAPH_CANCEL_LINK_CREATION',
  GRAPH_START_NODE_MOVE: 'GRAPH_START_NODE_MOVE'
}

export const setLinkFromNodeId = (nodeId) => {
  return {
    type: types.GRAPH_SET_LINK_FROM,
    target: 'GUI',
    nodeId
  };
}

export const setLinkToNodeId = (nodeId) => {
  return {
    type: types.GRAPH_SET_LINK_TO,
    target: 'GUI',
    nodeId
  };
}

export const cancelLinkCreation = () => {
  return {
    type: types.GRAPH_CANCEL_LINK_CREATION,
    target: 'GUI'
  };
}

export const startNodeMove = (offsetX, offsetY) => {
  return {
    type: types.GRAPH_START_NODE_MOVE,
    target: 'GUI',
    offsetX,
    offsetY
  };
}