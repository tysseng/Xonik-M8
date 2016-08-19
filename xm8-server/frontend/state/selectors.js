//TODO: Use reselect for selectors
//https://github.com/reactjs/reselect
export const getInputGroups = state => state.inputgroups;
export const getVirtualInputs = state => state.virtualInputs;
export const getNodes = state => state.graph.get('nodes');
export const getPatchView = state => state.patchview;
export const getFileDialog = state => state.filedialog;