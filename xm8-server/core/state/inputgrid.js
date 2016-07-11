import {Map} from 'immutable';
import {inputgridActionTypes} from '../../shared/state/actions/inputgrid';

const inputgrid = (
  state = Map({
    selectedElement: '',
    dragStart: Map({
      x: '',
      y: ''
    })
  }), 
  action) => {

  switch(action.type){
    case inputgridActionTypes.SELECT_ELEMENT:
      return state.set('selectedElement', action.id).setIn(['dragStart', 'x'], action.x).setIn(['dragStart', 'y'], action.y);
    case inputgridActionTypes.MOVE_ELEMENT:
      return state;
    case inputgridActionTypes.DESELECT_ELEMENT:
      return state.set('selectedElement', '');
  } 
  return state;
}

export default inputgrid;