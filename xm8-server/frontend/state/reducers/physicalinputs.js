import { Map } from 'immutable';

const emptyState = Map({
  byId: Map(),
  groups: Map()
});

const physicalInputs = (state = emptyState, action) => {
  switch(action.type){
    case 'SET_STATE':
      if(action.state.physicalInputs){
        return state.merge(action.state.physicalInputs);
      }        
      return state;
    default:
      return state;
  }
}

export default physicalInputs;
