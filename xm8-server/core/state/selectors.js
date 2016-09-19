import store from './store.js';

const getState = () => {
  return store.getState();
}

export const getNodes = (patchNumber) => getState().patches.getIn([patchNumber, 'graph', 'nodes']);
export const getNode = (patchNumber, nodeId) => getState().patches.getIn([patchNumber, 'graph', 'nodes', nodeId]);
export const getGraph = (patchNumber) => getState().patches.getIn([patchNumber, 'graph']);
export const getMatrix = (patchNumber) => getState().patches.getIn([patchNumber, 'matrix']);
export const getPatch = (patchNumber) => getState().patches.get(patchNumber);
export const getPatchview = (patchNumber) => getState().patchviews.get(patchNumber);
export const getVirtualInputs = (patchNumber) => getState().patches.getIn([patchNumber, 'virtualInputs']);
export const getPhysicalInputs = () => getState().physicalInputs;
export const getVirtualInputGroups = (patchNumber) => getState().patches.getIn([patchNumber, 'inputgroups']);
export const getControllers = (patchNumber) => getState().controllers.get(patchNumber);
export const getController = (patchNumber) => getState().controllers.get(patchNumber);
export const getFilesystem = () => getState().filesystem;