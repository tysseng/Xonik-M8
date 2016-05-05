import {Map} from 'immutable';

const merge = (state, changes) => Object.assign({}, state, changes);  

const matrix = (
  state = Map({
    "selectedNode": "",
    "shouldAutoUpdate": false
  }), 
  action) => {
  switch (action.type){
    case 'SELECT_NODE': 
      return state.set("selectedNode", action.nodeId);
    case 'SET_STATE':
      console.log("Setting matrix state");
      console.log(action.state.matrix)
      return state.merge(action.state.matrix);
    default: 
      return state;
  }
}

export default matrix