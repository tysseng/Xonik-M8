//TODO: Use reselect for selectors
//https://github.com/reactjs/reselect
export const getVirtualInputGroups = state => state.patches.getIn(['0', 'inputgroups']);
export const getVirtualInputs = state => state.patches.getIn(['0', 'virtualInputs']);
export const getPhysicalInputs = state => state.physicalInputs;
export const getMatrix = state => state.patches.getIn(['0', 'matrix']);
export const getGraph = state => state.patches.getIn(['0', 'graph']);
export const getNodes = state => state.patches.getIn(['0', 'graph', 'nodes']);
export const getPatchview = state => state.patchviews.get('0');
export const getFileDialog = state => state.filedialog;
export const getFilesystem = state => state.filesystem;
export const getControllers = state => state.controllers.get('0');
export const getNetwork = state => state.network;

export const getInputsAsJS = state => {
  let inputs = getVirtualInputs(state).get('byId').toJS();
  _.merge(inputs, getPhysicalInputs(state).get('byId').toJS());
  return inputs;
}