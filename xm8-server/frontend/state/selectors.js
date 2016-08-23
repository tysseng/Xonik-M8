//TODO: Use reselect for selectors
//https://github.com/reactjs/reselect
export const getVirtualInputGroups = state => state.inputgroups;
export const getVirtualInputs = state => state.virtualInputs;
export const getPhysicalInputs = state => state.physicalInputs;
export const getNodes = state => state.graph.get('nodes');
export const getPatchView = state => state.patchview;
export const getFileDialog = state => state.filedialog;
export const getControllerGroups = state => state.controllers;

export const getInputsAsJS = state => {
  let inputs = getVirtualInputs(state).get('byId').toJS();
  _.merge(inputs, getPhysicalInputs(state).get('byId').toJS());
  return inputs;
}