const node = (state, action) => {
  switch (action.type){
    case 'CHANGE_NODE_TYPE':
      // do nothing if not the node we're looking for.
      if(state.id !== action.nodeId) {
        return state;
      }

      // copy all state and change single property
      return Object.assign({}, state, {
        type: action.typeId
      })
    default: 
      return state;
  }
}

const nodes = (
  state = [{
    id: "0",
    type: "2"
  }], 
  action) => {
  switch (action.type){
    case 'CHANGE_NODE_TYPE':
      // loop over every item in array. id check is done in node().
      return state.map(n => node(n, action));
    default: 
      return state;
  }
}

export default nodes