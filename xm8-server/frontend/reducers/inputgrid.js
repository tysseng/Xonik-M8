import {Map} from 'immutable';

const inputs = (
  state = Map({
    selectedElement: '',
    dragStart: Map({
      x: '',
      y: ''
    })
  }), 
  action) => {

  switch(action.type){
    case 'SET_STATE':
      if(action.state.inputgrid){
        return state.merge(action.state.inputgrid);
      }        
      break;  
  } 
  return state;
}

export default inputs;
