import {Map} from 'immutable';
import {inputgridActionTypes} from '../../shared/state/actions/inputgrid';

const inputs = (
  state = Map({
    selectedElementId: '',
    selectedGroup: '',
    dragStart: Map({
      x: '',
      y: '',
      originX: '',
      originY: ''
    }),
    groups: Map(),
    newElementDialog: Map({
      show: false,
      type: '',
      id: ''
    })
  }), 
  action) => {

  switch(action.type){
    case 'SET_STATE':
      if(action.state.inputgrid){
        return state.merge(action.state.inputgrid);
      }        
      break;  
    case inputgridActionTypes.SELECT_ELEMENT:
      return state.set('selectedElementId', action.id)
        .setIn(['dragStart', 'x'], action.mouseX)
        .setIn(['dragStart', 'y'], action.mouseY)
        .setIn(['dragStart', 'originX'], action.offsetXem)
        .setIn(['dragStart', 'originY'], action.offsetYem);
    case inputgridActionTypes.DESELECT_ELEMENT:
      return state.set('selectedElementId', '');      
    case inputgridActionTypes.OPEN_NEW_ELEMENT_DIALOG:
      return state.setIn(['newElementDialog', 'show'], true);
    case inputgridActionTypes.ADD_ELEMENT:
    case inputgridActionTypes.CLOSE_NEW_ELEMENT_DIALOG:
      return state
        .setIn(['newElementDialog', 'show'], false)
        .setIn(['newElementDialog', 'type'], '')
        .setIn(['newElementDialog', 'id'], '');      
    case inputgridActionTypes.SELECT_ID_IN_NEW_ELEMENT_DIALOG:
      return state
        .setIn(['newElementDialog', 'type'], action.elementType)
        .setIn(['newElementDialog', 'id'], action.elementId);    
  } 
  return state;
}

export default inputs;
