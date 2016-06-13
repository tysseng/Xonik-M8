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