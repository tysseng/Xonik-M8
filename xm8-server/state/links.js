import paramTypes from '../shared/matrix/ParameterTypes.js';
import {Map, OrderedMap} from 'immutable';

const isLink = (type) => {
  console.log(type, paramTypes.map.LINK.id)
  return type === paramTypes.map.LINK.id;
}

const getLinkId = (action) => {
  return action.nodeId + '-' + action.paramId;
}

const links = (state = OrderedMap(), action) => {
  switch (action.type){
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