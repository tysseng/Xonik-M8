import {Map} from 'immutable';
import {inputgroupsActionTypes} from '../../../shared/state/actions/inputgroups';


// Element in a group id is equal to whatever the element contains - input id if it is an id etc.
const inputs = (
  state = Map({
    selectedElementId: '',
    dragElementId: '',
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
      if(action.state.inputgroups){
        return state.merge(action.state.inputgroups);
      }        
      break;  
    case inputgroupsActionTypes.SELECT_GROUP:
      return state.set('selectedGroup', action.selectedGroupId);
    case inputgroupsActionTypes.SELECT_ELEMENT:
      return state.set('selectedElementId', action.id)
        .set('dragElementId', action.id)
        .setIn(['dragStart', 'x'], action.mouseX)
        .setIn(['dragStart', 'y'], action.mouseY)
        .setIn(['dragStart', 'originX'], action.offsetXem)
        .setIn(['dragStart', 'originY'], action.offsetYem);
    case inputgroupsActionTypes.DESELECT_ELEMENT:
      return state.set('selectedElementId', '');      
    case inputgroupsActionTypes.DESELECT_DRAG_ELEMENT:
      return state.set('dragElementId', '');      
    case inputgroupsActionTypes.OPEN_NEW_ELEMENT_DIALOG:
      return state.setIn(['newElementDialog', 'show'], true);
    case inputgroupsActionTypes.ADD_ELEMENT:
    case inputgroupsActionTypes.CLOSE_NEW_ELEMENT_DIALOG:
      return state
        .setIn(['newElementDialog', 'show'], false)
        .setIn(['newElementDialog', 'type'], '')
        .setIn(['newElementDialog', 'id'], '');      
    case inputgroupsActionTypes.SELECT_ID_IN_NEW_ELEMENT_DIALOG:
      return state
        .setIn(['newElementDialog', 'type'], action.elementType)
        .setIn(['newElementDialog', 'id'], action.elementId);
  }
  return state;
}

export default inputs;
