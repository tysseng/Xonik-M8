// If on, all changes to the matrix are sent to the synth core immediately
export const moveNode = (nodeId, x, y) => {
  return {
    type: 'NODE_MOVE',
    target: 'SERVER',
    nodeId,
    x,
    y
  };
}

export const setLinkFromNodeId = (nodeId) => {
  return {
    type: 'MATRIX_SET_LINK_FROM',
    target: 'GUI',
    nodeId
  };
}

export const setLinkToNodeId = (nodeId) => {
  return {
    type: 'MATRIX_SET_LINK_TO',
    target: 'GUI',
    nodeId
  };
}

export const cancelLinkCreation = () => {
  return {
    type: 'MATRIX_CANCEL_LINK_CREATION',
    target: 'GUI'
  };
}

export const startNodeMove = (offsetX, offsetY) => {
  return {
    type: 'MATRIX_START_NODE_MOVE',
    target: 'GUI',
    offsetX,
    offsetY
  };
}