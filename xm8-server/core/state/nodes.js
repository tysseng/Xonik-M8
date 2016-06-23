// TODO - let emtpy values be undefined, not ""?  

import nodeTypes from '../../shared/matrix/NodeTypes.js';
import paramTypes from '../../shared/matrix/ParameterTypes.js';
import {List, Map, OrderedMap} from 'immutable';
import _ from 'lodash';

let nextAvailableNodeId = 1;

const isLink = (type) => {
  return type === paramTypes.map.LINK.id;
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

const param = (state, action) => {

  switch(action.type){
    case 'DELETE_LINK':
      return state.set('value', "");
    case 'CHANGE_LINK_NAME':  
      return state.setIn(['value', 'name'], action.name);
    case 'TOGGLE_LINK_NAME_IN_GRAPH':  
      return state.setIn(['value', 'showNameInGraph'], action.visible);
    case 'CHANGE_NODE_PARAM_TYPE':
      return state.merge(getEmptyParam(action.paramId, action.paramType));
    case 'CHANGE_NODE_PARAM_VALUE':
      let value = action.paramValue;
      if(isLink(action.paramType) && value && value != "") value = createLink(action);
      return state.set('value', value);
    case 'CHANGE_NODE_PARAM_UNIT':    
      return state.set('unit', action.paramUnit);
    case 'NEW_LINK':
      let newLinkParamValue = createLink(action);
      return state.merge(getParam(action.paramId, paramTypes.map.LINK.id, newLinkParamValue, ''));
    case 'DELETE_NODE': 
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
    case 'DELETE_LINK':
      if(state.get('id') === action.fromNodeId){
        return state.deleteIn(['consumers', getLinkIdFromIds(action.toNodeId, action.toParamId)]);
      } else if(state.get('id') === action.toNodeId){
        return validateNode(state.updateIn(['params', action.toParamId], aParam => param(aParam, action)));
      }
      return state;
    case 'CHANGE_LINK_NAME':
    case 'TOGGLE_LINK_NAME_IN_GRAPH':      
      return state.updateIn(['params', action.toParamId], aParam => param(aParam, action));
    case 'NEW_NODE':
      return validateNode(getEmptyNode('' + nextAvailableNodeId++));
    case 'INTERNAL_ADD_TO_CONSUMERS':
      let linkId = getLinkId(action);
      let consumerLink = createConsumerLink(action);
      return state.setIn(['consumers', linkId], consumerLink);      
    case 'CHANGE_NODE_TYPE':
      return validateNode(state.merge({
        type: action.typeId,
        params: getEmptyParams(action.typeId)
      }));
    case 'NEW_LINK':
    case 'CHANGE_NODE_PARAM_TYPE':
    case 'CHANGE_NODE_PARAM_VALUE':
    case 'CHANGE_NODE_PARAM_UNIT':
      return validateNode(state.updateIn(['params', action.paramId], (aParam) => param(aParam, action)));
    case 'CHANGE_NODE_NAME':
      return state.set('name', action.name);
    case 'DELETE_NODE': 
      // check if deleted node is the value of any parameter of this node
      let params = state.get('params');
      if(params){     
        _.each(params.toArray(), currentParam => {            
          state = state.updateIn(['params', currentParam.get('id')], aParam => param(aParam, action));
        });
      }    
      return validateNode(state);  
    case 'NODE_MOVE':    
      console.log(action)
      return state.setIn(['vis','x'], action.x).setIn(['vis','y'], action.y);  
    default: 
      return state;
  }
}
  
const nodes = (
  state = OrderedMap(), 
  action) => {

  switch (action.type){
    case 'LOAD_NODES_FROM_FILE':
      return action.nodes;
    case 'DELETE_LINK':
      state = state.updateIn([action.fromNodeId], aNode => node(aNode, action));
      return state.updateIn([action.toNodeId], aNode => node(aNode, action));
    case 'CHANGE_LINK_NAME':
    case 'TOGGLE_LINK_NAME_IN_GRAPH':      
      return state.updateIn([action.toNodeId], aNode => node(aNode, action));    
    case 'NEW_NODE': 
      let nodeId = '' + nextAvailableNodeId;
      return state.set(nodeId, node(undefined, action));
    case 'DELETE_NODE':
      // check if deleted node is the value of any parameter of any node
      _.each(state.toIndexedSeq().toArray(), (currentNode) => {
        state = state.updateIn([currentNode.get('id')], aNode => node(aNode, action));
      });

      return state.delete(action.nodeId);   
    case 'NEW_LINK':   
    case 'CHANGE_NODE_PARAM_VALUE':
      // add or remove consumer link
      if(isLink(action.paramType)){
        if(action.paramValue && action.paramValue !== ""){       
          state = state.updateIn([action.paramValue], (aNode) => node(aNode, getAddToConsumersAction(action)));
        } else {
          state = removeFromConsumers(state, action.nodeId, action.paramId);
        }
      }
      return state.updateIn([action.nodeId], (aNode) => node(aNode, action));
    case 'CHANGE_NODE_PARAM_TYPE':
      // Remove any from-node consumers
      state = removeFromConsumers(state, action.nodeId, action.paramId);   
      return state.updateIn([action.nodeId], (aNode) => node(aNode, action));
    case 'CHANGE_NODE_TYPE':
      // Remove any from-node consumers
      let params = state.getIn([action.nodeId, 'params']);
      if(params){
        _.each(params.toArray(), param => {
          state = removeFromConsumers(state, action.nodeId, param.get('id'));             
        });        
      }
      return state.updateIn([action.nodeId], (aNode) => node(aNode, action));  
    case 'CHANGE_NODE_NAME':
      return state.updateIn([action.nodeId], (aNode) => node(aNode, action));
    case 'CHANGE_NODE_PARAM_UNIT':
      return state.updateIn([action.nodeId], (aNode) => node(aNode, action));
    case 'NODE_MOVE':
      return state.updateIn([action.nodeId], (aNode) => node(aNode, action));
    default: 
      return state;
  }
}

export default nodes