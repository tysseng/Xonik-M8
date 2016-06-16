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
  console.log("Setting link from node " + nodeId);
  return {
    type: 'MATRIX_SET_LINK_FROM',
    target: 'GUI',
    nodeId
  };
}

export const setLinkToNodeId = (nodeId) => {
  console.log("Setting link to node " + nodeId);
  return {
    type: 'MATRIX_SET_LINK_TO',
    target: 'GUI',
    nodeId
  };
}

export const cancelLinkCreation = () => {
  console.log("Setting link from node ");
  return {
    type: 'MATRIX_CANCEL_LINK_CREATION',
    target: 'GUI'
  };
}