import {List} from 'immutable';

const nodes = (state = List(), action) => {
  switch (action.type){
    case 'SET_STATE':
      console.log("Setting state")
      console.log(action.state.nodes);
      return state.merge(action.state.nodes);
    default: 
      return state;
  }
}

export default nodes