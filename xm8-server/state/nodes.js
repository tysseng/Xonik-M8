import nodeTypes from '../shared/matrix/NodeTypes.js';
import {List, Map, OrderedMap} from 'immutable';
import _ from 'lodash';

let nextAvailableNodeId = 1;



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
  type: "-1"  
})

const param = (state, action) => {
  switch(action.type){
    case 'CHANGE_NODE_PARAM_TYPE':
      return state.merge(getEmptyParam(action.paramId, action.paramType));
    case 'CHANGE_NODE_PARAM_VALUE':
      return state.set('value', action.paramValue);
    case 'CHANGE_NODE_PARAM_UNIT':    
      return state.set('unit', action.paramUnit);
    default:
      return state;
  }
}

const node = (state, action) => {
  switch (action.type){
    case 'NEW_NODE':
      return getEmptyNode('' + nextAvailableNodeId++);
    case 'CHANGE_NODE_TYPE':
      // change type and reset parameters
      return state.merge({
        type: action.typeId,
        params: getEmptyParams(action.typeId)
      });
    case 'CHANGE_NODE_PARAM_TYPE':
    case 'CHANGE_NODE_PARAM_VALUE':
    case 'CHANGE_NODE_PARAM_UNIT':
      return state.updateIn(['params', action.paramId], (aParam) => param(aParam, action));
    default: 
      return state;
  }
}

const nodes = (
  state = OrderedMap({"0":
    Map({
      id: "0",
      type: "2"
    })
  }), 
  action) => {
  switch (action.type){
    case 'NEW_NODE': 
      let nodeId = '' + nextAvailableNodeId;
      return state.set(nodeId, node(undefined, action));
    case 'DELETE_NODE':
      return state.delete(action.nodeId);      
    case 'CHANGE_NODE_TYPE':
    case 'CHANGE_NODE_PARAM_TYPE':
    case 'CHANGE_NODE_PARAM_VALUE':
    case 'CHANGE_NODE_PARAM_UNIT':
      return state.updateIn([action.nodeId], (aNode) => node(aNode, action));
    default: 
      return state;
  }
}

export default nodes