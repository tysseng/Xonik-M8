// TODO - let emtpy values be undefined, not ""?
// TODO - se på om man kan tweake action.type for å få bedre plassering av sletting av consumers.
// TODO: Bytt fra updatedState til state.
// TODO: Make link immutable!!!!!

import nodeTypes from '../shared/matrix/NodeTypes.js';
import paramTypes from '../shared/matrix/ParameterTypes.js';
import {List, Map, OrderedMap} from 'immutable';
import _ from 'lodash';

// TODO: Too much bookkeeping related to links. rethink link concept.

let nextAvailableNodeId = 1;

const isLink = (type) => {
  return type === paramTypes.map.LINK.id;
}

const getEmptyParam = (id, type) => Map({
  id: id,
  type: type,    
  value: "",
  unit: ""
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
    name: ''
  });

  console.log("Linking output of node " + action.paramValue + " to param " + action.paramId + " of node " + action.nodeId);
  return link;
}

// A consumer link is a link for a node to the node that consumes it, and is only used for deleting and serializing. The 'real'
// link is found on the parameter that consumes another node.
const createConsumerLink = action => {
  let link = Map({
    id: getLinkId(action),
    to: action.nodeId,
    toParam: action.paramId
  });

  console.log("Consumer: Linking output of node " + action.paramValue + " to param " + action.paramId + " of node " + action.nodeId);
  return link; 
}

const param = (state, action) => {

  switch(action.type){
    case 'CHANGE_NODE_PARAM_TYPE':
      return state.merge(getEmptyParam(action.paramId, action.paramType));
    case 'CHANGE_NODE_PARAM_VALUE':
      let value = action.paramValue;
      if(isLink(action.paramType) && value && value != "") value = createLink(action);
      return state.set('value', value);
    case 'CHANGE_NODE_PARAM_UNIT':    
      return state.set('unit', action.paramUnit);
    case 'DELETE_NODE': 
      // Will be executed if the deleted node links to this param, remove value
      return state.set('value', "");      
    default:
      return state;
  }
}

const validateNode = (state) => {
  let nodeIsValid = true;
  let updatedState = state;

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
      updatedState = updatedState.setIn(['params', paramDef.id, 'valid'], paramIsValid);        
    });
  } else {
    nodeIsValid = false;
  }
  return updatedState.set('valid', nodeIsValid);   
}

const node = (state, action) => {
  switch (action.type){
    case 'NEW_NODE':
      return validateNode(getEmptyNode('' + nextAvailableNodeId++));
    case 'CHANGE_NODE_TYPE':
      return validateNode(state.merge({
        type: action.typeId,
        params: getEmptyParams(action.typeId)
      }));
    case 'CHANGE_NODE_PARAM_TYPE':
    case 'CHANGE_NODE_PARAM_VALUE':
    case 'CHANGE_NODE_PARAM_UNIT':
      return validateNode(state.updateIn(['params', action.paramId], (aParam) => param(aParam, action)));
    case 'CHANGE_NODE_NAME':
      return state.set('name', action.name);
    case 'DELETE_NODE': 
      // Will be executed if the deleted node links to this node - find and reset the parameter that
      // links to the deleted node
      let updatedState = state;
      let params = state.get('params');
      if(params){     
        _.each(params.toArray(), currentParam => {
          let currentFromNodeId = currentParam.getIn(['value', 'from'])
          if(isLink(currentParam.get('type')) && currentFromNodeId == action.nodeId){
            updatedState = validateNode(updatedState.updateIn(['params', currentParam.get('id')], aParam => param(aParam, action)));
            console.log("Removing link, node deleted ");
            console.log(updatedState);
          }
        });
      }    
      return updatedState;  
    default: 
      return state;
  }
}

const removeFromConsumers = (state, nodeId, paramId) => {
    let param = state.getIn([nodeId, 'params', paramId]);      
    if(isLink(param.get('type'))) {
      let currentFromNodeId = param.getIn(['value', 'from'])
      if(currentFromNodeId){
        let linkId = getLinkIdFromIds(nodeId, paramId);
        console.log("Removing " + linkId + " from " + currentFromNodeId);
        state = state.deleteIn([currentFromNodeId, 'consumers', linkId]);    
      }
    }  
    return state;  
}
  
const nodes = (
  state = OrderedMap(), 
  action) => {

  let updatedState = state;

  switch (action.type){
    case 'NEW_NODE': 
      let nodeId = '' + nextAvailableNodeId;
      return state.set(nodeId, node(undefined, action));
    case 'DELETE_NODE':

      // Search for nodes that link to the deleted node and propagate the action all the way down to the parameter
      // to reset it.
      _.each(state.toIndexedSeq().toArray(), (currentNode) => {  
        let params = currentNode.get('params');
        if(params){     
          _.each(params.toArray(), param => {
            let currentFromNodeId = param.getIn(['value', 'from'])
            if(isLink(param.get('type')) && currentFromNodeId === action.nodeId){
              updatedState = updatedState.updateIn([currentNode.get('id')], aNode => node(aNode, action));
            }
          });
        }
      });
      return updatedState.delete(action.nodeId);      
    case 'CHANGE_NODE_PARAM_VALUE':
      // add or remove consumer link
      if(isLink(action.paramType)){
        let linkId = getLinkId(action);
        if(action.paramValue && action.paramValue !== ""){
          let consumerLink = createConsumerLink(action);
          updatedState = updatedState.setIn([action.paramValue, 'consumers', linkId], consumerLink);
        } else {
          updatedState = removeFromConsumers(updatedState, action.nodeId, action.paramId);
        }
      }
      return updatedState.updateIn([action.nodeId], (aNode) => node(aNode, action));
    case 'CHANGE_NODE_PARAM_TYPE':
      // Remove any from-node consumers
      updatedState = removeFromConsumers(updatedState, action.nodeId, action.paramId);   
      return updatedState.updateIn([action.nodeId], (aNode) => node(aNode, action));
    case 'CHANGE_NODE_TYPE':
      // Remove any from-node consumers
      let params = updatedState.getIn([action.nodeId, 'params']);
      if(params){
        _.each(params.toArray(), param => {
          updatedState = removeFromConsumers(updatedState, action.nodeId, param.get('id'));             
        });        
      }
      return updatedState.updateIn([action.nodeId], (aNode) => node(aNode, action));  
    case 'CHANGE_NODE_NAME':
      return updatedState.updateIn([action.nodeId], (aNode) => node(aNode, action));
    case 'CHANGE_NODE_PARAM_UNIT':
      return updatedState.updateIn([action.nodeId], (aNode) => node(aNode, action));
    default: 
      return state;
  }
}

export default nodes