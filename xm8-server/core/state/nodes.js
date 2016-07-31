// TODO - let emtpy values be undefined, not ""?  

import nodeTypes from '../../shared/graph/NodeTypes';
import paramTypes from '../../shared/graph/ParameterTypes';
import { types, changeNodeParamValue } from '../../shared/state/actions/nodes';
import { getUndoWrapper } from './undo';
import { groups as undoGroups } from '../../shared/state/actions/undo';
import {List, Map, OrderedMap} from 'immutable';
import _ from 'lodash';

let nextAvailableNodeId = 1;

const isLink = (type) => {
  return type === paramTypes.map.LINK.id;
}

const isOutput = (type) => {
  return type === paramTypes.map.OUTPUT.id;
}

const getEmptyParam = (id, type) => {
  let unit = '';
  if(type === paramTypes.map.CONSTANT.id){
    unit = 0;
  }

  return Map({
    id: id,
    type: type,    
    value: "",
    unit: unit
  });
}

const getParam = (id, type, value, unit) => Map({
  id: id,
  type: type,    
  value: value,
  unit: unit
})

const getEmptyParams = (typeId) => {
  let definition = nodeTypes.idMap[typeId];
  let params = List();

  _.each(definition.params, (param) => {
    params = params.push(getEmptyParam(param.id, ""));
  });

  return params; 
}

const getEmptyNode = (nodeId) => Map({
  id: nodeId,
  name: "Node " + nodeId,  
  type: "-1",
  vis: Map({x: 10, y: 10}),
  consumers: Map()  
})

const getLinkId = (action) => {
  return getLinkIdFromIds(action.nodeId, action.paramId);
}

const getLinkIdFromIds = (nodeId, paramId) => {
  return '' + nodeId + '-' + paramId;
}

const createLink = (action) => {
  let link = Map({
    id: getLinkId(action),
    from: action.paramValue,
    to: action.nodeId,
    toParam: action.paramId,
    name: '',
    showNameInGraph: true
  });

  console.log("Linking output of node " + action.paramValue + " to param " + action.paramId + " of node " + action.nodeId);
  return link;
}

// A consumer link is a link for a node to the node that consumes it, and is only used for deleting and serializing. The 'real'
// link is found on the parameter that consumes another node.
const createConsumerLink = action => {
  let link = Map({
    id: getLinkId(action),
    from: action.paramValue,
    to: action.nodeId,
    toParam: action.paramId
  });

  console.log("Consumer: Linking output of node " + action.paramValue + " to param " + action.paramId + " of node " + action.nodeId);
  return link; 
}

const validateNode = (state) => {
  let nodeIsValid = true;

  let definition = nodeTypes.idMap[state.get('type')];
  if(definition && definition.id != nodeTypes.map.NOT_SELECTED.id) {

    _.each(definition.params, paramDef => {
      let param = state.getIn(['params', paramDef.id]);
      let paramValue = param.get('value');
      let paramType = param.get('type');
      let hasValue = paramValue && paramValue != "";
      let hasSelectedType = paramType !== '' && paramType !== paramTypes.map.UNUSED.id;
      let paramIsValid = paramDef.optional && !hasSelectedType || hasValue; // TODO: Add type and custom validators here

      if(!paramIsValid){
        nodeIsValid = false;
      }
      state = state.setIn(['params', paramDef.id, 'valid'], paramIsValid);        
    });
  } else {
    nodeIsValid = false;
  }
  return state.set('valid', nodeIsValid);   
}

const getFromNodeId = param => {
  return param.getIn(['value', 'from']);
}

const getAddToConsumersAction = action => {
  return {
    type: 'INTERNAL_ADD_TO_CONSUMERS',      
    nodeId: action.nodeId,
    paramValue: action.paramValue,
    paramId: action.paramId
  }   
}

const removeFromConsumers = (state, nodeId, paramId) => {
    let param = state.getIn([nodeId, 'params', paramId]);      
    if(isLink(param.get('type'))) {
      let currentFromNodeId = getFromNodeId(param);
      if(currentFromNodeId){
        let linkId = getLinkIdFromIds(nodeId, paramId);
        state = state.deleteIn([currentFromNodeId, 'consumers', linkId]);    
      }
    }  
    return state;  
}

const updateOutputMaps = (state, action) => {
  let currentOutputMapping = state.getIn(['reverseMap', action.nodeId]);
  if(currentOutputMapping){
    state = state
      .deleteIn(['map', currentOutputMapping])
      .deleteIn(['reverseMap', action.nodeId])
  }
  if(action.type === types.CHANGE_NODE_PARAM_VALUE && isOutput(action.paramType) && action.paramValue !== ''){
    state = state
      .setIn(['map', action.paramValue], Map({nodeId: action.nodeId, paramId: action.paramId}))
      .setIn(['reverseMap', action.nodeId], action.paramValue);
  }
  return state;
}

const removeExistingOutputMapping = (state, action) => {
  if(isOutput(action.paramType)){
    // clear the value from any other parameter that has this output as its value
    if(action.paramValue && action.paramValue !== ""){
      let existingMapping = state.getIn(['outputs', 'map', action.paramValue]);
      if(existingMapping){
        let changeValueAction = changeNodeParamValue(existingMapping.get('nodeId'), existingMapping.get('paramId'), action.paramType, '');
        state = state.updateIn(['nodes'], (nodesState) => nodes(nodesState, changeValueAction)); 
      }
    }  
  }
  return state;
}

const param = (state, action) => {

  switch(action.type){
    case types.DELETE_LINK:
      return state.set('value', "");
    case types.CHANGE_LINK_NAME:  
      return state.setIn(['value', 'name'], action.name);
    case types.TOGGLE_LINK_NAME_IN_GRAPH:  
      return state.setIn(['value', 'showNameInGraph'], action.visible);
    case types.CHANGE_NODE_PARAM_TYPE:
      return state.merge(getEmptyParam(action.paramId, action.paramType));
    case types.CHANGE_NODE_PARAM_VALUE:
      let value = action.paramValue;
      if(isLink(action.paramType) && value && value != "") value = createLink(action);
      return state.set('value', value);
    case types.CHANGE_NODE_PARAM_UNIT:    
      return state.set('unit', action.paramUnit);
    case types.NEW_LINK:
      let newLinkParamValue = createLink(action);
      return state.merge(getParam(action.paramId, paramTypes.map.LINK.id, newLinkParamValue, ''));
    case types.DELETE_NODE: 
      // check if deleted node is the value of this parameter
      if(isLink(state.get('type')) && getFromNodeId(state) === action.nodeId){
        return state.set('value', "");        
      }
      return state;
    default:
      return state;
  }
}

const node = (state, action) => {
  switch (action.type){
    case types.DELETE_LINK:
      if(state.get('id') === action.fromNodeId){
        return state.deleteIn(['consumers', getLinkIdFromIds(action.toNodeId, action.toParamId)]);
      } else if(state.get('id') === action.toNodeId){
        return validateNode(state.updateIn(['params', action.toParamId], aParam => param(aParam, action)));
      }
      return state;
    case types.CHANGE_LINK_NAME:
    case types.TOGGLE_LINK_NAME_IN_GRAPH:
      return state.updateIn(['params', action.toParamId], aParam => param(aParam, action));
    case types.NEW_NODE:
      return validateNode(getEmptyNode('' + nextAvailableNodeId++));
    case 'INTERNAL_ADD_TO_CONSUMERS':
      let linkId = getLinkId(action);
      let consumerLink = createConsumerLink(action);
      return state.setIn(['consumers', linkId], consumerLink);      
    case types.CHANGE_NODE_TYPE:
      return validateNode(state.merge({
        type: action.typeId,
        params: getEmptyParams(action.typeId)
      }));
    case types.NEW_LINK:
    case types.CHANGE_NODE_PARAM_TYPE:
    case types.CHANGE_NODE_PARAM_VALUE:
    case types.CHANGE_NODE_PARAM_UNIT:
      return validateNode(state.updateIn(['params', action.paramId], (aParam) => param(aParam, action)));
    case types.CHANGE_NODE_NAME:
      return state.set('name', action.name);
    case types.DELETE_NODE: 
      // check if deleted node is the value of any parameter of this node
      let params = state.get('params');
      if(params){     
        _.each(params.toArray(), currentParam => {            
          state = state.updateIn(['params', currentParam.get('id')], aParam => param(aParam, action));
        });
      }    
      return validateNode(state);  
    case types.NODE_MOVE:
      return state.setIn(['vis','x'], action.x).setIn(['vis','y'], action.y);  
    default: 
      return state;
  }
}

const nodes = (state, action) => {
  switch (action.type){
    case types.LOAD_NODES_FROM_FILE:
      return action.nodes;
    case types.DELETE_LINK:
      state = state.updateIn([action.fromNodeId], aNode => node(aNode, action));
      return state.updateIn([action.toNodeId], aNode => node(aNode, action));
    case types.CHANGE_LINK_NAME:
    case types.TOGGLE_LINK_NAME_IN_GRAPH:      
      return state.updateIn([action.toNodeId], aNode => node(aNode, action));    
    case types.NEW_NODE: 
      let nodeId = '' + nextAvailableNodeId;
      return state.set(nodeId, node(undefined, action));
    case types.DELETE_NODE:
      // check if deleted node is the value of any parameter of any node
      _.each(state.toIndexedSeq().toArray(), (currentNode) => {
        state = state.updateIn([currentNode.get('id')], aNode => node(aNode, action));
      });

      return state.delete(action.nodeId);   
    case types.NEW_LINK:   
    case types.CHANGE_NODE_PARAM_VALUE:      
      if(isLink(action.paramType)){
        // add or remove consumer link
        if(action.paramValue && action.paramValue !== ""){       
          state = state.updateIn([action.paramValue], (aNode) => node(aNode, getAddToConsumersAction(action)));
        } else {
          state = removeFromConsumers(state, action.nodeId, action.paramId);
        }
      }
      return state.updateIn([action.nodeId], (aNode) => node(aNode, action));
    case types.CHANGE_NODE_PARAM_TYPE:
      // Remove any from-node consumers
      state = removeFromConsumers(state, action.nodeId, action.paramId);   
      return state.updateIn([action.nodeId], (aNode) => node(aNode, action));
    case types.CHANGE_NODE_TYPE:
      // Remove any from-node consumers
      let params = state.getIn([action.nodeId, 'params']);
      if(params){
        _.each(params.toArray(), param => {
          state = removeFromConsumers(state, action.nodeId, param.get('id'));             
        });        
      }
      return state.updateIn([action.nodeId], (aNode) => node(aNode, action));  
    case types.CHANGE_NODE_NAME:
      return state.updateIn([action.nodeId], (aNode) => node(aNode, action));
    case types.CHANGE_NODE_PARAM_UNIT:
      return state.updateIn([action.nodeId], (aNode) => node(aNode, action));
    case types.NODE_MOVE:
      return state.updateIn([action.nodeId], (aNode) => node(aNode, action));
    default: 
      return state;
  }
}

const outputs = (state, action) => {
  switch (action.type){
    case types.DELETE_NODE:
    case types.CHANGE_NODE_TYPE:
    case types.CHANGE_NODE_PARAM_TYPE:
    case types.CHANGE_NODE_PARAM_VALUE:
    case types.NEW_LINK:
      return updateOutputMaps(state, action);
    default: 
      return state;
  }
}

const graph = (state = getInitialState(), action) => {
  // any existing usage of the currenly selected output must be removed before we add
  // it to a node AND before we update the outputs mapping.
  // This requires knowledge of both outputs and nodes and has to be at this level.
  if(action.type === types.CHANGE_NODE_PARAM_VALUE) {
    state = removeExistingOutputMapping(state, action);
  }

  return state
    .updateIn(['outputs'], substate => outputs(substate, action))
    .updateIn(['nodes'], substate => nodes(substate, action));
}


/**
 Convenience function that calculates some knowhow about the graph every time it changes and exposes it as state.
 Triggers on selectable actions
 May be abuse of the model but perhaps most efficient place to keep this?

 - validity of graph
 - reachable nodes 

const calculatedState
*/
const getInitialState = () => {
  return Map({
    nodes: OrderedMap(),
    outputs: Map({
      map: Map(),
      reverseMap: Map()
    })
  });
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
    types.SET_UNDO_POINT
];

const undoWrapper = getUndoWrapper(undoGroups.GRAPH, undoableActions, graph, getInitialState);

export default undoWrapper;