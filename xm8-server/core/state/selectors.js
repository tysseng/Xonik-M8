import store from './store.js';

const getState = () => {
  return store.getState();
}

export const getNodes = () => getState().patches.getIn(['0', 'graph', 'nodes']);
export const getGraph = () => getState().patches.getIn(['0', 'graph']);
export const getMatrix = () => getState().patches.getIn(['0', 'matrix']);
export const getPatch = (patchNumber) => getState().patches.get(patchNumber);
export const getVirtualInputs = () => getState().patches.getIn(['0', 'virtualInputs']);
export const getPhysicalInputs = () => getState().physicalInputs;
export const getVirtualInputGroups = () => getState().patches.getIn(['0', 'inputgroups']);
export const getControllers = () => getState().controllers;
export const getFilesystem = () => getState().filesystem;