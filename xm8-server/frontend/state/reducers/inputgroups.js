import { Map } from 'immutable';
import { inputgroupsActionTypes } from '../../../shared/state/actions/inputgroups';
import { types as patchActionTypes } from '../../../shared/state/actions/patch';
import { getUpdatedState } from './reducerTools';

// Element in a group id is equal to whatever the element contains - input id if it is an id etc.

export const emptyState =Map({
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
});


const inputs = (state, action) => {
  switch(action.type){
    case 'SET_STATE':
      let updatedState = getUpdatedState(['inputgroups'], action);
      if(updatedState){
        return state.merge(updatedState);
      }
      break;
    case patchActionTypes.RESET_PATCH:
    case inputgroupsActionTypes.DELETE_GROUP:
      return state
        .set('selectedGroup', '')
        .set('selectedElementId', '');
    case inputgroupsActionTypes.DELETE_ELEMENT:
      if(action.id === state.get('selectedElementId')){
        return state.set('selectedElementId', '');
      }
      return state;
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
