import nodeTypes from '../../../shared/matrix/NodeTypes.js';
import {List, Map} from 'immutable';

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

  console.log(definition)

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
      return getEmptyNode(action.nodeId);
    case 'CHANGE_NODE_TYPE':
      // do nothing if not the node we're looking for.
      if(state.get('id') !== action.nodeId) {
        return state;
      }

      // reset parameters
      let params = getEmptyParams(action.typeId);

      // copy all state and change single property
      return state.merge({
        type: action.typeId,
        params: params
      });
    case 'CHANGE_NODE_PARAM_TYPE':
    case 'CHANGE_NODE_PARAM_VALUE':
    case 'CHANGE_NODE_PARAM_UNIT':
      // do nothing if not the node we're looking for.
      if(state.get('id') !== action.nodeId) {
        return state;
      }
      // copy all state and change single property
      return state.updateIn(['params', action.paramId], (aParam) => param(aParam, action));
    default: 
      return state;
  }
}

const nodes = (
  state = List.of(
    Map({
      id: "0",
      type: "2"
    })
  ), 
  action) => {
  switch (action.type){
    case 'NEW_NODE': 
      return state.push(node(undefined, action)) // immutable, push returns a new list
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