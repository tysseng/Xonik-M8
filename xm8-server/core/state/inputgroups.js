import _ from 'lodash';
import { Map } from 'immutable';
import { types } from '../../shared/state/actions/inputgroups';
import { types as inputActionTypes } from '../../shared/state/actions/inputs';
import { types as patchActionTypes } from '../../shared/state/actions/patch';


export const undoableActions = [
  types.CHANGE_ELEMENT_TYPE,
  types.NEW_GROUP,
  types.DELETE_GROUP,
  types.ADD_ELEMENT,
  types.DELETE_ELEMENT,
  types.SET_UNDO_POINT,
  types.TOGGLE_VISIBILITY,
  inputActionTypes.INPUTCONFIG_DELETE_INPUT,
  patchActionTypes.RESET_PATCH
];

const createNewGroup = (id) => {
  return Map({
    id,
    name: 'New group',
    isVisible: true,
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

const removeElementFromGroups = (state, elementId) => {

  let groups = state.get('groups');

  _.each(groups.toJS(), group => {
    if(groups.getIn([group.id, 'elements', elementId])){
      state = state.deleteIn(['groups', group.id, 'elements', elementId]);
    }
  });

  return state;
}

// Element in a group id is equal to whatever the element contains - input id if it is an id etc.
const inputgroups = (state, action) => {

  switch(action.type){
    case types.MOVE_ELEMENT:
      return state
        .setIn(['groups', action.groupId, 'elements', action.id, 'offset', 'x'], action.offsetXem)
        .setIn(['groups', action.groupId, 'elements', action.id, 'offset', 'y'], action.offsetYem);
    case types.NEW_GROUP:
      let newGroup = createNewGroup(action.groupId);
      return state.setIn(['groups', action.groupId], newGroup);
    case types.DELETE_GROUP:
      return state.deleteIn(['groups', action.groupId]);
    case types.ADD_ELEMENT:
      let wrappedElement = getWrappedElement(action.id, action.groupId, action.offsetXem, action.offsetYem, action.elementId, action.elementType);
      return state.setIn(['groups', action.groupId, 'elements', action.id], wrappedElement);
    case types.DELETE_ELEMENT:
      return state.deleteIn(['groups', action.groupId, 'elements', action.id]);
    case types.CHANGE_ELEMENT_TYPE:
      return state.setIn(['groups', action.groupId, 'elements', action.id, 'type'], action.inputType);
    case inputActionTypes.INPUTCONFIG_DELETE_INPUT:
      return removeElementFromGroups(state, action.inputId);
    case types.TOGGLE_VISIBILITY:
      return state.setIn(['groups', action.groupId, 'isVisible'], action.isVisible);
    case types.RENAME_GROUP:
      return state.setIn(['groups', action.groupId, 'name'], action.name);
    case patchActionTypes.RESET_PATCH:
      return emptyState;
    default:
      return state;
  }
}

export const emptyState = Map({
  groups: Map()
});

export default inputgroups;