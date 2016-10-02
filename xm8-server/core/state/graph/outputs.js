import _ from 'lodash';
import { List, Map } from 'immutable';
import paramTypes from '../../../shared/graph/ParameterTypes';
import { types } from '../../../shared/state/actions/nodes';

const isOutput = (type) => {
  return type === paramTypes.map.OUTPUT.id;
}

const getOutputsForNode = (outputs, nodeId) => {
  let outputsInUse = [];
  _.forEach(outputs, (mapping, output) => {    
    if(mapping.nodeId === nodeId) {
      outputsInUse.push(output);
    }
  });
  return outputsInUse;
}

const getOutputsForParam = (outputs, nodeId, paramId) => {
  let outputsInUse = [];
  _.forEach(outputs, (mapping, output) => {    
    if(mapping.nodeId === nodeId && mapping.paramId === paramId) {
      outputsInUse.push(output);
    }
  });
  return outputsInUse;  
}

const removeExistingOutputMappings = (state, action) => {
  let allOutputs = state.toJS();
  let outputsInUse;
  switch (action.type){
    case types.DELETE_NODE:
    case types.CHANGE_NODE_TYPE:
      outputsInUse = getOutputsForNode(allOutputs, action.nodeId);
      break;      
    case types.CHANGE_NODE_PARAM_TYPE:
    case types.CHANGE_NODE_PARAM_VALUE:
    case types.NEW_LINK:
      outputsInUse = getOutputsForParam(allOutputs, action.nodeId, action.paramId);
      break;
  }

  if(outputsInUse) {
    _.forEach(outputsInUse, output => {
      state = state.delete(output);
    })
  }
  return state;  
}

const addNewOutputMapping = (state, action) => {

  if(isOutput(action.paramType) && action.paramValue && action.paramValue !== ''){
    state = state.set(action.paramValue, Map({nodeId: action.nodeId, paramId: action.paramId}));
  }
  return state;
}

// outputs-reducer
const outputs = (state, action) => {  
  state = removeExistingOutputMappings(state, action);
  state = addNewOutputMapping(state, action);
  return state;
}

export default outputs;
