import store from './store.js';

const getState = () => {
  return store.getState();
}

export const getNodes = (patchNumber) => getState().patches.getIn([patchNumber, 'graph', 'nodes']);
export const getGraphOutputs = (patchNumber) => getState().patches.getIn([patchNumber, 'graph', 'outputs']);
export const getNode = (patchNumber, nodeId) => getState().patches.getIn([patchNumber, 'graph', 'nodes', nodeId]);
export const getParameter = (patchNumber, nodeId, paramId) => getState().patches.getIn([patchNumber, 'graph', 'nodes', nodeId, 'params', paramId]);
export const getGraph = (patchNumber) => getState().patches.getIn([patchNumber, 'graph']);
export const getMatrix = (patchNumber) => getState().patches.getIn([patchNumber, 'matrix']);
export const getPatch = (patchNumber) => getState().patches.get(patchNumber);
export const getPatchview = (patchNumber) => getState().patchviews.get(patchNumber);
export const getVirtualInputs = (patchNumber) => getState().patches.getIn([patchNumber, 'virtualInputs', 'byId']);
export const getVirtualInput = (patchNumber, inputId) => getState().patches.getIn([patchNumber, 'virtualInputs', 'byId', inputId]);
export const getPhysicalInputs = () => getState().physicalInputs;
export const getPhysicalInput = (inputId) => getState().physicalInputs.getIn(['byId', inputId]);

export const getInput = (patchNumber, inputId) => {
  if(inputId.startsWith('virt')){
    return getVirtualInput(patchNumber, inputId);
  } else {
    return getPhysicalInput(inputId);
  }
}

export const getVirtualInputGroups = (patchNumber) => getState().patches.getIn([patchNumber, 'inputgroups']);
export const getControllers = (patchNumber) => getState().controllers.get(patchNumber);
export const getController = (patchNumber) => getState().controllers.get(patchNumber);
export const getFilesystem = () => getState().filesystem;