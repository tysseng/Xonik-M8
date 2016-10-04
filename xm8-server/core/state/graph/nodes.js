import nodeTypes from '../../../shared/graph/NodeTypes';
import paramTypes from '../../../shared/graph/ParameterTypes';
import {unitsById} from '../../../shared/graph/ParameterUnits';
import { types } from '../../../shared/state/actions/nodes';
import { types as inputActionTypes } from '../../../shared/state/actions/inputs';
import { List, Map } from 'immutable';
import _ from 'lodash';

const isLink = (type) => {
  return type === paramTypes.map.LINK.id;
}

const isVirtualInput = (type) => {
  return type === paramTypes.map.VIRTUALINPUT.id;
}

const getEmptyParam = (id, type) => {
  let unit = '';
  if(type === paramTypes.map.CONSTANT.id){
    unit = unitsById.FRACTION.id;
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

const getPreselectedParamType = (paramDefinition) => {
  let whitelist = paramDefinition.typeWhitelist;
  if(whitelist && whitelist.length === 1){
    return whitelist[0];
  }
  return "";
}

const getEmptyParams = (typeId) => {
  let definition = nodeTypes.idMap[typeId];
  let params = List();

  _.each(definition.params, (param) => {
    let paramType = getPreselectedParamType(param);
    params = params.push(getEmptyParam(param.id, paramType));
  });

  return params; 
}

const getEmptyNode = (nodeId) => Map({
  id: nodeId,
  name: "Node " + nodeId,  
  type: "-1",
  vis: Map({x: 10, y: 10}),
  consumers: Map(),
  result: Map({
    value: '',
    unit: ''
  })
})

const getLinkIdFromAction = (action) => {
  return getLinkIdFromIds(action.paramValue, action.nodeId, action.paramId);
}

const getLinkIdFromIds = (fromNodeId, toNodeId, paramId) => {
  return '' + fromNodeId + '-' + toNodeId + '-' + paramId;
}

// make it easier to use the linkId to find the correct parameter to update.
const splitLinkId = (action) => {
  let linkIdParts = action.linkId.split('-');
  action.fromNodeId = linkIdParts[0];
  action.toNodeId = linkIdParts[1];
  action.toParamId = linkIdParts[2];
  return action;
}

const createLink = (action) => {
  let link = Map({
    id: getLinkIdFromAction(action),
    from: action.paramValue,
    to: action.nodeId,
    toParam: action.paramId,
    name: '',
    showNameInGraph: true
  });

  return link;
}

// A consumer link is a link for a node to the node that consumes it, and is only used for deleting and serializing. The 'real'
// link is found on the parameter that consumes another node.
const createConsumerLink = action => {
  let link = Map({
    id: action.linkId,
    from: action.paramValue,
    to: action.nodeId,
    toParam: action.paramId
  });

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
    linkId: getLinkIdFromAction(action),
    nodeId: action.nodeId,
    paramValue: action.paramValue,
    paramId: action.paramId
  }   
}

const removeFromConsumers = (state, toNodeId, paramId) => {
  let param = state.getIn([toNodeId, 'params', paramId]);
  if(isLink(param.get('type'))) {
    let currentFromNodeId = getFromNodeId(param);
    if(currentFromNodeId){
      let linkId = getLinkIdFromIds(currentFromNodeId, toNodeId, paramId);
      state = state.deleteIn([currentFromNodeId, 'consumers', linkId]);
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
      if(isLink(action.paramType) && value && value != "") {
        value = createLink(action);
      }
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
    case inputActionTypes.INPUTCONFIG_DELETE_INPUT:
      if(isVirtualInput(state.get('type')) && state.get('value') === action.inputId){
        return state.set('value', '');
      } else {
        return state;
      }
    default:
      return state;
  }
}

const node = (state, action) => {

  let params;

  switch (action.type){
    case types.DELETE_LINK:
      if(state.get('id') === action.fromNodeId){
        return state.deleteIn(['consumers', action.linkId]);
      } else if(state.get('id') === action.toNodeId){
        return validateNode(state.updateIn(['params', action.toParamId], aParam => param(aParam, action)));
      }
      return state;
    case types.CHANGE_LINK_NAME:
    case types.TOGGLE_LINK_NAME_IN_GRAPH:
      return state.updateIn(['params', action.toParamId], aParam => param(aParam, action));
    case types.NEW_NODE:
      return validateNode(getEmptyNode(action.nodeId));
    case 'INTERNAL_ADD_TO_CONSUMERS':
      let consumerLink = createConsumerLink(action);
      return state.setIn(['consumers', action.linkId], consumerLink);
    case types.CHANGE_NODE_TYPE:
      return validateNode(state.merge({
        type: action.typeId,
        params: getEmptyParams(action.typeId)
      }));
    case types.CHANGE_NODE_RESULT:
      return state.setIn(['result', 'value'], action.result);
    case types.CHANGE_NODE_RESULT_UNIT:
      return state.setIn(['result', 'unit'], action.unit);
    case types.NEW_LINK:
    case types.CHANGE_NODE_PARAM_TYPE:
    case types.CHANGE_NODE_PARAM_VALUE:
    case types.CHANGE_NODE_PARAM_UNIT:
      return validateNode(state.updateIn(['params', action.paramId], (aParam) => param(aParam, action)));
    case types.CHANGE_NODE_NAME:
      return state.set('name', action.name);
    case types.DELETE_NODE: 
      // check if deleted node is the value of any parameter of this node
      params = state.get('params');
      if(params){     
        _.each(params.toArray(), currentParam => {            
          state = state.updateIn(['params', currentParam.get('id')], aParam => param(aParam, action));
        });
      }    
      return validateNode(state);  
    case types.NODE_MOVE:
      return state.setIn(['vis','x'], action.x).setIn(['vis','y'], action.y);
    case inputActionTypes.INPUTCONFIG_DELETE_INPUT:
      params = state.get('params');
      if(params){
        _.each(params.toArray(), currentParam => {
          state = state.updateIn(['params', currentParam.get('id')], aParam => param(aParam, action));
        });
      }
      return validateNode(state);
    default: 
      return state;
  }
}

const nodes = (state, action) => {
  switch (action.type){
    case types.DELETE_LINK:
      action = splitLinkId(action);
      state = state.updateIn([action.fromNodeId], aNode => node(aNode, action));
      return state.updateIn([action.toNodeId], aNode => node(aNode, action));
    case types.CHANGE_LINK_NAME:
    case types.TOGGLE_LINK_NAME_IN_GRAPH:      
      return state.updateIn([action.toNodeId], aNode => node(aNode, action));    
    case types.NEW_NODE: 
      return state.set(action.nodeId, node(undefined, action));
    case types.DELETE_NODE:
      // check if deleted node is the value of any parameter of any node
      _.each(state.toIndexedSeq().toArray(), (currentNode) => {
        state = state.updateIn([currentNode.get('id')], aNode => node(aNode, action));
      });

      let nodeToDeleteParams = state.getIn([action.nodeId, 'params']);
      if(nodeToDeleteParams) {
        _.each(nodeToDeleteParams.toJS(), param => {
          if (isLink(param.type) && param.value !== '') {
            state = state.deleteIn([param.value.from, 'consumers', param.value.id]);
          }
        });
      }

      return state.delete(action.nodeId);   
    case types.NEW_LINK:   
    case types.CHANGE_NODE_PARAM_VALUE:
      if(isLink(action.paramType)){
        // remove existing consumer link. Slightly brute force as it will delete even if link has not changed.
        state = removeFromConsumers(state, action.nodeId, action.paramId);

        if(action.paramValue && action.paramValue !== ""){
          // add new consumer link
          state = state.updateIn([action.paramValue], (aNode) => node(aNode, getAddToConsumersAction(action)));
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
    case types.CHANGE_NODE_RESULT:
      return state.updateIn([action.nodeId], (aNode) => node(aNode, action));
    case types.CHANGE_NODE_RESULT_UNIT:
      return state.updateIn([action.nodeId], (aNode) => node(aNode, action));
    case types.CHANGE_NODE_NAME:
      return state.updateIn([action.nodeId], (aNode) => node(aNode, action));
    case types.CHANGE_NODE_PARAM_UNIT:
      return state.updateIn([action.nodeId], (aNode) => node(aNode, action));
    case types.NODE_MOVE:
      return state.updateIn([action.nodeId], (aNode) => node(aNode, action));
    case inputActionTypes.INPUTCONFIG_DELETE_INPUT:
      let nodes = state.toArray();
      _.each(nodes, nodeToSearch => {
        state = state.updateIn([nodeToSearch.get('id')], (aNode) => node(aNode, action));
      });
      return state;
    default: 
      return state;
  }
}

export default nodes;