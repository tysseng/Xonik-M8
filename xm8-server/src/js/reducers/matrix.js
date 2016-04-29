import nodeTypes from '../../../shared/matrix/NodeTypes.js';

const merge = (state, changes) => Object.assign({}, state, changes);  

const matrix = (
  state = {
    selectedNode: ""
  }, 
  action) => {
  switch (action.type){
    case 'SELECT_NODE': 
      return merge(state, {selectedNode: action.nodeId})
    default: 
      return state;
  }
}

export default matrix