import {Map} from 'immutable';

const inputs = (
  state = Map({
    selectedElement: '',
    offset: Map({
      x: 0, 
      y: 0
    }),    
    dragStart: Map({
      x: '',
      y: '',
      originX: '',
      originY: ''
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
