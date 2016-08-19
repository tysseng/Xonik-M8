import {Map} from 'immutable';
import { inputgroupsActionTypes } from '../../shared/state/actions/inputgroups';
import { types as nodeActionTypes } from '../../shared/state/actions/nodes';
import { getUndoWrapper } from './undo';
import { groups as undoGroups } from '../../shared/state/actions/undo';

const createNewGroup = (id) => {
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

const inputgroups = (
  state = getInitialState(), 
  action) => {

  switch(action.type){
    case inputgroupsActionTypes.MOVE_ELEMENT:
      return state        
        .setIn(['groups', action.groupId, 'elements', action.id, 'offset', 'x'], action.offsetXem)
        .setIn(['groups', action.groupId, 'elements', action.id, 'offset', 'y'], action.offsetYem);
    case inputgroupsActionTypes.NEW_GROUP:
      let newGroup = createNewGroup(action.groupId);
      return state.setIn(['groups', action.groupId], newGroup);
    case inputgroupsActionTypes.DELETE_GROUP:
      console.log(action)
      console.log("delete", state, state.deleteIn(['groups', action.groupId]));
      return state.deleteIn(['groups', action.groupId]);
    case inputgroupsActionTypes.ADD_ELEMENT:
      let wrappedElement = getWrappedElement(action.id, action.groupId, action.offsetXem, action.offsetYem, action.elementId, action.elementType);
      return state.setIn(['groups', action.groupId, 'elements', action.id], wrappedElement);
    case inputgroupsActionTypes.DELETE_ELEMENT:
      return state.deleteIn(['groups', action.groupId, 'elements', action.id]);
    case inputgroupsActionTypes.CHANGE_ELEMENT_TYPE:
      return state.setIn(['groups', action.groupId, 'elements', action.id, 'type'], action.inputType);
    case nodeActionTypes.LOAD_PATCH_FROM_FILE:
      return action.virtualInputGroups;
    default:
      return state;
  }
}

const getInitialState = () => {
  return Map({
    groups: Map()
  });
}

const undoableActions = [
  inputgroupsActionTypes.CHANGE_ELEMENT_TYPE,
  inputgroupsActionTypes.NEW_GROUP,
  inputgroupsActionTypes.DELETE_GROUP,
  inputgroupsActionTypes.ADD_ELEMENT,
  inputgroupsActionTypes.DELETE_ELEMENT,
  inputgroupsActionTypes.SET_UNDO_POINT
];
 
const undoWrapper = getUndoWrapper(undoGroups.INPUTGROUPS, undoableActions, inputgroups, getInitialState);

export default undoWrapper;