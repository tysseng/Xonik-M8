import store from './store.js';

const getState = () => {
  return store.getState();
}

export const getNodes = () => getState().graph.get('nodes');
export const getGraph = () => getState().graph;
export const getMatrix = () => getState().matrix;
export const getVirtualInputs = () => getState().virtualInputs;
export const getPhysicalInputs = () => getState().physicalInputs;
export const getVirtualInputGroups = () => getState().inputgroups;
export const getControllers = () => getState().controllers;