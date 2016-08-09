import {Map} from 'immutable';
import { inputgroupsActionTypes } from '../../shared/state/actions/inputgroups';
import { getUndoWrapper } from './undo';
import { groups as undoGroups } from '../../shared/state/actions/undo';
import { getNextInputGroupId } from '../persistence/fileRepo';

const createNewGroup = () => {
  return Map({
    id: '' + getNextInputGroupId(),
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
      let newGroup = createNewGroup();
      let groupId = newGroup.get('id');
      return state.setIn(['groups', groupId], newGroup)
        //TODO: TEMPORARY, REMOVE
        .set('selectedGroup', groupId);
    case inputgroupsActionTypes.LOAD_GROUP:
      return state;
    case inputgroupsActionTypes.ADD_ELEMENT:
      let wrappedElement = getWrappedElement(action.id, action.groupId, action.offsetXem, action.offsetYem, action.elementId, action.elementType);
      return state.setIn(['groups', action.groupId, 'elements', action.id], wrappedElement);
    case inputgroupsActionTypes.DELETE_ELEMENT:
      return state.deleteIn(['groups', action.groupId, 'elements', action.id]);
    case inputgroupsActionTypes.CHANGE_ELEMENT_TYPE:
      return state.setIn(['groups', action.groupId, 'elements', action.id, 'type'], action.inputType); 
  } 
  return state;
}

const getInitialState = () => {
  return Map({
    groups: Map()
  });
}

const undoableActions = [
  inputgroupsActionTypes.CHANGE_ELEMENT_TYPE,
  inputgroupsActionTypes.NEW_GROUP,
  inputgroupsActionTypes.LOAD_GROUP,
  inputgroupsActionTypes.ADD_ELEMENT,
  inputgroupsActionTypes.DELETE_ELEMENT,
  inputgroupsActionTypes.SET_UNDO_POINT
];
 
const undoWrapper = getUndoWrapper(undoGroups.INPUTGROUPS, undoableActions, inputgroups, getInitialState);

export default undoWrapper;