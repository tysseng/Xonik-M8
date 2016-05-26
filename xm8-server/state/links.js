import paramTypes from '../shared/matrix/ParameterTypes.js';
import nodeTypes from '../shared/matrix/NodeTypes.js';
import {Map, OrderedMap} from 'immutable';
import _ from 'lodash';

const isLink = (type) => {
  console.log(type, paramTypes.map.LINK.id)
  return type === paramTypes.map.LINK.id;
}

const getLinkId = (action) => {
  return '' + action.nodeId + '-' + action.paramId;
}

const deleteLink = (state, link) => {
  if(!link) return state;
  console.log("deleted link " + link.get('id'));
  let updatedState = state.delete(link.get('id'));
  return updatedState;
}

const createLink = (state, action) => {
  let link = Map({
    id: getLinkId(action),
    from: action.paramValue,
    to: action.nodeId,
    toParam: action.paramId,
    name: ''
  });

  console.log("Linking output of node " + action.paramValue + " to param " + action.paramId + " of node " + action.nodeId);
  return state.set(link.get('id'), link);
}

const links = (state = OrderedMap(), action) => {
  let updatedState = state; 

  switch (action.type){
    case 'DELETE_LINK':
      return deleteLink(state, state.get(action.linkId));
    case 'DELETE_NODE':
      _.each(state.toIndexedSeq().toArray(), (link) => {
        if(link.get('from') === action.nodeId || link.get('to') === action.nodeId){         
          updatedState = deleteLink(updatedState, link);
        }
      });
      return updatedState;
    case 'CHANGE_NODE_TYPE':
      // remove links from this node if node type has no result.
      if(action.typeId === nodeTypes.map.OUTPUT.id || action.typeId === nodeTypes.map.OUTPUT_TUNED.id){
        _.each(state.toIndexedSeq().toArray(), (link) => {
          if(link.get('from') === action.nodeId){
            updatedState = deleteLink(updatedState, link);
          } 
        });     
      } else {
        _.each(state.toIndexedSeq().toArray(), (link) => {
          if(link.get('to') === action.nodeId){
            updatedState = deleteLink(updatedState, link); // delete all links to this node as the parameters no longer make sense
          } 
        });
      }
      return updatedState;           
    case 'CHANGE_NODE_PARAM_VALUE':
      if(isLink(action.paramType)){    
        if(action.paramValue === ""){
          return deleteLink(state, state.get(getLinkId(action)));
        } else {
          return createLink(state, action);
        }
      }
      return state;
    case 'CHANGE_NODE_PARAM_TYPE':
      // brute force cleanup
      return deleteLink(state, state.get(getLinkId(action)));
  } 
  return state;     
}

export default links;