import store from '../../../../core/state/store';
import { resetGraph,
  createNewNode, changeNodeType, changeNodeName, moveNode, deleteNode,
  changeNodeParamType, changeNodeParamValue, changeNodeParamUnit,
  createNewLink, deleteLink, changeLinkName, toggleLinkNameInGraph } from '../../../../shared/state/actions/nodes';
import { getNode, getNodes, getParameter } from '../../../../core/state/selectors';
import { map as nodeTypesMap } from '../../../../shared/graph/NodeTypes';
import { map as paramTypesMap } from '../../../../shared/graph/ParameterTypes';
import { unitsById } from '../../../../shared/graph/ParameterUnits';

let currentNodeId = 0;
let voiceGroupId = '0';

export const init = () => {
  store.dispatch(resetGraph(voiceGroupId));
  currentNodeId = 0;
}

const getNextNodeId = () => {
  let newNodeId = currentNodeId;
  currentNodeId++;
  return '' + newNodeId;
}

export const createNodeOfType = (nodeType) => {
  let nodeId = getNextNodeId();
  store.dispatch(createNewNode(voiceGroupId));
  store.dispatch(changeNodeType(nodeId, nodeType, voiceGroupId));
  return getNode(voiceGroupId, nodeId).toJS();
}

export const invert = () => {
  let nodeId = getNextNodeId();
  store.dispatch(createNewNode(voiceGroupId));
  store.dispatch(changeNodeType(nodeId, nodeTypesMap.INVERT.id, voiceGroupId));
  return getNode(voiceGroupId, nodeId).toJS();
}

export const sum = () => {
  let nodeId = getNextNodeId();
  store.dispatch(createNewNode(voiceGroupId));
  store.dispatch(changeNodeType(nodeId, nodeTypesMap.SUM.id, voiceGroupId));
  return getNode(voiceGroupId, nodeId).toJS();
}

export const delay = () => {
  let nodeId = getNextNodeId();
  store.dispatch(createNewNode(voiceGroupId));
  store.dispatch(changeNodeType(nodeId, nodeTypesMap.DELAY_LINE.id, voiceGroupId));
  return getNode(voiceGroupId, nodeId).toJS();
}

export const output = (output) => {
  let nodeId = getNextNodeId();
  store.dispatch(createNewNode(voiceGroupId));
  store.dispatch(changeNodeType(nodeId, nodeTypesMap.OUTPUT.id, voiceGroupId));
  if(output) setParamFromNodeId(nodeId, '1', paramTypesMap.OUTPUT.id, output, voiceGroupId);
  return getNode(voiceGroupId, nodeId).toJS();
}

export const outputTuned = (output) => {
  let nodeId = getNextNodeId();
  store.dispatch(createNewNode(voiceGroupId));
  store.dispatch(changeNodeType(nodeId, nodeTypesMap.OUTPUT_TUNED.id, voiceGroupId));
  if(output) setParamFromNodeId(nodeId, '1', paramTypesMap.OUTPUT.id, output, voiceGroupId);
  return getNode(voiceGroupId, nodeId).toJS();
}

export const link = (from, to, paramId) => {
  store.dispatch(createNewLink(from.id, to.id, paramId, voiceGroupId));
  return from.id + '-' + to.id + '-' + paramId;
}

export const name = (node, name) => {
  store.dispatch(changeNodeName(node.id, name, voiceGroupId));
  return getNode(voiceGroupId, node.id).toJS();
}

export const param = (node, paramId, type, value, unit) => {
  store.dispatch(changeNodeParamType(node.id, paramId, type, voiceGroupId));
  if(value) store.dispatch(changeNodeParamValue(node.id, paramId, type, value, voiceGroupId));
  if(unit) store.dispatch(changeNodeParamUnit(node.id, paramId, unit, voiceGroupId));
  return getNode(voiceGroupId, node.id).toJS();
}

export const setParamFromNodeId = (nodeId, paramId, type, value, unit) => {
  store.dispatch(changeNodeParamType(nodeId, paramId, type, voiceGroupId));
  if(value) store.dispatch(changeNodeParamValue(nodeId, paramId, type, value, voiceGroupId));
  if(unit) store.dispatch(changeNodeParamUnit(nodeId, paramId, unit, voiceGroupId));
  return getNode(voiceGroupId, nodeId).toJS();
}

export const getMutableNodes = () => {
  return getNodes(voiceGroupId).toJS();
}