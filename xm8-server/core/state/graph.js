import {Map, OrderedMap} from 'immutable';
import paramTypes from '../../shared/graph/ParameterTypes';
import { types, changeNodeParamValue } from '../../shared/state/actions/nodes';
import { types as inputActionTypes } from '../../shared/state/actions/inputs';
import { getUndoWrapper } from './undo';
import { groups as undoGroups } from '../../shared/state/actions/undo';
import outputs from './graph/outputs';
import nodes from './graph/nodes';

const isOutput = (type) => {
  return type === paramTypes.map.OUTPUT.id;
}

// remove output from parameter value of the node currently outputting to this output.
const removeOutputFromCurrentParameter = (state, action) => {
  if(isOutput(action.paramType) && action.paramValue !== ''){
    // if the requested output is currently connected to another node:
    let outputs = state.get('outputs');
    let mapping = outputs.get('' + action.paramValue);
    if(mapping){
      let changeValueAction = changeNodeParamValue(mapping.get('nodeId'), mapping.get('paramId'), action.paramType, '');
      state = state.updateIn(['nodes'], (nodesState) => nodes(nodesState, changeValueAction)); 
    }
  }
  return state;
}

const getInitialState = () => {
  return Map({
    nodes: OrderedMap({      
    }),
    outputs: Map(),
    nextAvailableNodeId: 0
  });
}

// root reducer
const graph = (state = getInitialState(), action) => {
  // any existing usage of the currenly selected output must be removed before we add
  // it to a node AND before we update the outputs mapping.
  // This requires knowledge of both outputs and nodes and has to be at this level.
  if(action.type === types.LOAD_PATCH_FROM_FILE) {
      return action.graph;
  } else if(action.type === types.CHANGE_NODE_PARAM_VALUE) {
    state = removeOutputFromCurrentParameter(state, action);
  } else if(action.type === types.NEW_NODE) {
    // Available node ids are kept in state to save the series with the patch. 
    // This adds the first available id to the action and increments the id counter.
    let nodeId = state.get('nextAvailableNodeId');
    state = state.set('nextAvailableNodeId', nodeId +1);
    action.nodeId = '' + nodeId;    
  }

  return state
    .updateIn(['outputs'], substate => outputs(substate, action))
    .updateIn(['nodes'], substate => nodes(substate, action));
}

const undoableActions = [
    types.NEW_NODE,
    types.DELETE_NODE,
    types.CHANGE_NODE_TYPE,
    types.CHANGE_NODE_PARAM_TYPE,      
    types.CHANGE_NODE_PARAM_VALUE,      
    types.CHANGE_NODE_PARAM_UNIT,      
    types.NEW_LINK,  
    types.TOGGLE_LINK_NAME_IN_GRAPH,
    types.DELETE_LINK,
    types.SET_UNDO_POINT,
    inputActionTypes.INPUTCONFIG_DELETE_INPUT
];

/**
TODO:
 Convenience function that calculates some knowhow about the graph every time it changes and exposes it as state.
 Triggers on selectable actions
 May be abuse of the model but perhaps most efficient place to keep this?

 - validity of graph
 - reachable nodes 

const calculatedState
*/


const undoWrapper = getUndoWrapper(undoGroups.GRAPH, undoableActions, graph, getInitialState);

export default undoWrapper;