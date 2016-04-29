import nodeTypes from '../../../shared/matrix/NodeTypes.js';

const merge = (state, changes) => Object.assign({}, state, changes);  

const getEmptyParam = (id, type) => (
  {
    id: id,
    type: type,    
    value: "",
    unit: ""
  }
)

const getEmptyParams = (typeId) => {
  var definition = nodeTypes.idMap[typeId];
  var params = [];

  _.each(definition.params, (param) => {
    params.push(getEmptyParam(param.id, ""));
  });

  return params; 
}

const param = (state, action) => {
  switch(action.type){
    case 'CHANGE_NODE_PARAM_TYPE':
      if(state.id !== action.paramId) {
        return state;
      }    
      return merge(state, getEmptyParam(action.paramId, action.paramType));
    case 'CHANGE_NODE_PARAM_VALUE':
      if(state.id !== action.paramId) {
        return state;
      }    
      return merge(state, {value: action.paramValue});
    case 'CHANGE_NODE_PARAM_UNIT':    
      if(state.id !== action.paramId) {
        return state;
      }    
      return merge(state, {unit: action.paramUnit});
  }
}

const node = (state, action) => {
  switch (action.type){
    case 'CHANGE_NODE_TYPE':
      // do nothing if not the node we're looking for.
      if(state.id !== action.nodeId) {
        return state;
      }

      // reset parameters
      let params = getEmptyParams(action.typeId);
      
      // copy all state and change single property
      return merge(state, {
        type: action.typeId,
        params: params
      });
    case 'CHANGE_NODE_PARAM_TYPE':
    case 'CHANGE_NODE_PARAM_VALUE':
    case 'CHANGE_NODE_PARAM_UNIT':
    {      
      // do nothing if not the node we're looking for.
      if(state.id !== action.nodeId) {
        return state;
      }
      // copy all state and change single property
      return merge(state, {
        params: state.params.map(n => param(n, action))
      });
    }
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
    case 'CHANGE_NODE_PARAM_TYPE':
    case 'CHANGE_NODE_PARAM_VALUE':
    case 'CHANGE_NODE_PARAM_UNIT':
      // loop over every item in array. id check is done in node().
      return state.map(n => node(n, action));
    default: 
      return state;
  }
}

export default nodes