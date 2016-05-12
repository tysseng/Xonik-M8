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

const links = (state = OrderedMap(), action) => {
  if(state.toList().length > 0) console.log(state.toList()[0])
  switch (action.type){
    case 'DELETE_NODE':
      let updatedState = state;
      _.each(state.toIndexedSeq().toArray(), (link) => {
        if(link.get('from') === action.nodeId || link.get('to') === action.nodeId){
          console.log("deleted link " + link.get('id'));
          updatedState = updatedState.delete(link.get('id'));
        }
      });
      return updatedState;
    case 'CHANGE_NODE_TYPE':
      // TODO: A similar action is necessary in the nodes reducer to remove the value from the parameter.
      if(action.typeId === nodeTypes.map.OUTPUT.id){
        let updatedState = state;
        _.each(state.toIndexedSeq().toArray(), (link) => {
          if(link.get('from') === action.nodeId){
            console.log("deleted link " + link.get('id') + " because output nodes have no result");
            updatedState = updatedState.delete(link.get('id'));
          }
        });
        return updatedState;          
      }

      return state;
    case 'CHANGE_NODE_PARAM_VALUE':
      if(isLink(action.paramType)){    
        if(action.paramValue === ""){
          return state.delete(getLinkId(action));
        } else {
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
      }
      return state;
    case 'CHANGE_NODE_PARAM_TYPE':
      // brute force cleanup
      return state.delete(getLinkId(action));
  } 
  return state;     
}

export default links;