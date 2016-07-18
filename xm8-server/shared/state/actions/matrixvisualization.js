export const types = {
  NODE_MOVE: 'NODE_MOVE',
  MATRIX_SET_LINK_FROM: 'MATRIX_SET_LINK_FROM',
  MATRIX_SET_LINK_TO: 'MATRIX_SET_LINK_TO',
  MATRIX_CANCEL_LINK_CREATION: 'MATRIX_CANCEL_LINK_CREATION',
  MATRIX_START_NODE_MOVE: 'MATRIX_START_NODE_MOVE'
}

export const setLinkFromNodeId = (nodeId) => {
  return {
    type: types.MATRIX_SET_LINK_FROM,
    target: 'GUI',
    nodeId
  };
}

export const setLinkToNodeId = (nodeId) => {
  return {
    type: types.MATRIX_SET_LINK_TO,
    target: 'GUI',
    nodeId
  };
}

export const cancelLinkCreation = () => {
  return {
    type: types.MATRIX_CANCEL_LINK_CREATION,
    target: 'GUI'
  };
}

export const startNodeMove = (offsetX, offsetY) => {
  return {
    type: types.MATRIX_START_NODE_MOVE,
    target: 'GUI',
    offsetX,
    offsetY
  };
}