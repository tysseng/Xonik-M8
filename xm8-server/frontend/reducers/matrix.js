import {OrderedMap, Map, List, fromJS} from 'immutable';
import _ from 'lodash';
import { types } from '../../shared/state/actions/matrix';

const directoutputs = (state, action) => {
  switch(action.type){
    case types.DIRECT_OUTPUT_TOGGLE:
    case types.DIRECT_OUTPUT_HOVER:
      return state.set('hover', Map({inputId: action.inputId, outputId: action.outputId}));
  } 
  return state;
}

const root = (
  state = getInitialState(),
  action) => {
  switch(action.type){
    case 'SET_STATE':
      if(action.state.matrix){
        return state.merge(action.state.matrix);
      }        
      break;     
    case types.DIRECT_OUTPUT_HOVER:
    case types.DIRECT_OUTPUT_TOGGLE:
      return state.updateIn(['directoutputs'], substate => directoutputs(substate, action));
  } 
  return state;
}

const getInitialState = () => {
  return Map({
    directoutputs: Map({
      hover: Map({inputId: '', outputId: ''})
    })
  });
}

export default root;
