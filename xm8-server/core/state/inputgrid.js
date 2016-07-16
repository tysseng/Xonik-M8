import {Map} from 'immutable';
import { inputgridActionTypes } from '../../shared/state/actions/inputgrid';
import { getUndoWrapper } from './undo';
import { groups as undoGroups } from '../../shared/state/actions/undo';

const newGroup = (id) => {
  return Map({
    id,
    elements: Map()
  });
}

const getWrappedElement = (id, groupId, offsetXem, offsetYem, elementId) => {
  return Map({
    id,
    groupId,
    elementId,
    offset: Map({
      x: offsetXem,
      y: offsetYem
    })
  })
}

const inputgrid = (
  state = getInitialState(), 
  action) => {

  switch(action.type){
    case inputgridActionTypes.MOVE_ELEMENT:
      return state        
        .setIn(['groups', action.groupId, 'elements', action.id, 'offset', 'x'], action.offsetXem)
        .setIn(['groups', action.groupId, 'elements', action.id, 'offset', 'y'], action.offsetYem);
    case inputgridActionTypes.NEW_GROUP:
      return state.setIn(['groups', action.groupId], newGroup(action.groupId))
        //TODO: TEMPORARY, REMOVE
        .set('selectedGroup', action.groupId);
    case inputgridActionTypes.LOAD_GROUP:
      return state;
    case inputgridActionTypes.ADD_ELEMENT:
      let wrappedElement = getWrappedElement(action.id, action.groupId, action.offsetXem, action.offsetYem, action.elementId, action.elementType);
      return state.setIn(['groups', action.groupId, 'elements', action.id], wrappedElement);
    case inputgridActionTypes.DELETE_ELEMENT:
      return state.deleteIn(['groups', action.groupId, 'elements', action.id]);
    case inputgridActionTypes.CHANGE_ELEMENT_TYPE:
      return state.setIn(['groups', action.groupId, 'elements', action.id, 'type'], action.inputType); 
  } 
  return state;
}

const getInitialState = () => {
  return Map({
    groups: Map()
  });
}
 
const undoWrapper = getUndoWrapper(undoGroups.INPUTGRID, inputgrid, getInitialState);

export default undoWrapper;