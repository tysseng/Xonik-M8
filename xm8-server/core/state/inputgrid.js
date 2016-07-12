import {Map} from 'immutable';
import {inputgridActionTypes} from '../../shared/state/actions/inputgrid';

const inputgrid = (
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
    case inputgridActionTypes.SELECT_ELEMENT:
      return state.set('selectedElement', action.id)
        .setIn(['dragStart', 'x'], action.mouseX)
        .setIn(['dragStart', 'y'], action.mouseY)
        .setIn(['dragStart', 'originX'], action.offsetXem)
        .setIn(['dragStart', 'originY'], action.offsetYem);
    case inputgridActionTypes.MOVE_ELEMENT:
      return state        
        .setIn(['offset', 'x'], action.offsetXem)
        .setIn(['offset', 'y'], action.offsetYem);

    case inputgridActionTypes.DESELECT_ELEMENT:
      return state.set('selectedElement', '');
  } 
  return state;
}

export default inputgrid;