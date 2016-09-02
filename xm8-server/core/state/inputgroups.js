import _ from 'lodash';
import { Map } from 'immutable';
import { inputgroupsActionTypes } from '../../shared/state/actions/inputgroups';
import { types as inputActionTypes } from '../../shared/state/actions/inputs';
import { types as nodeActionTypes } from '../../shared/state/actions/nodes';
import { types as patchActionTypes } from '../../shared/state/actions/patch';


export const undoableActions = [
  inputgroupsActionTypes.CHANGE_ELEMENT_TYPE,
  inputgroupsActionTypes.NEW_GROUP,
  inputgroupsActionTypes.DELETE_GROUP,
  inputgroupsActionTypes.ADD_ELEMENT,
  inputgroupsActionTypes.DELETE_ELEMENT,
  inputgroupsActionTypes.SET_UNDO_POINT,
  inputgroupsActionTypes.TOGGLE_VISIBILITY,
  inputActionTypes.INPUTCONFIG_DELETE_INPUT,
  patchActionTypes.RESET_PATCH
];

export let hasChanged = false;
const updateHasChanged = (action) => {
  if(undoableActions.indexOf(action.type) > -1 || action.type === nodeActionTypes.LOAD_PATCH_FROM_FILE){
    hasChanged = true;
  }
}
export const clearHasChanged = () => {
  hasChanged = false;
}


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
const inputgroups = (
  state = getInitialState(), 
  action) => {

  updateHasChanged(action);

  switch(action.type){
    case inputgroupsActionTypes.MOVE_ELEMENT:
      return state
        .setIn(['groups', action.groupId, 'elements', action.id, 'offset', 'x'], action.offsetXem)
        .setIn(['groups', action.groupId, 'elements', action.id, 'offset', 'y'], action.offsetYem);
    case inputgroupsActionTypes.NEW_GROUP:
      let newGroup = createNewGroup(action.groupId);
      return state.setIn(['groups', action.groupId], newGroup);
    case inputgroupsActionTypes.DELETE_GROUP:
      return state.deleteIn(['groups', action.groupId]);
    case inputgroupsActionTypes.ADD_ELEMENT:
      let wrappedElement = getWrappedElement(action.id, action.groupId, action.offsetXem, action.offsetYem, action.elementId, action.elementType);
      return state.setIn(['groups', action.groupId, 'elements', action.id], wrappedElement);
    case inputgroupsActionTypes.DELETE_ELEMENT:
      console.log("delete", action);
      return state.deleteIn(['groups', action.groupId, 'elements', action.id]);
    case inputgroupsActionTypes.CHANGE_ELEMENT_TYPE:
      return state.setIn(['groups', action.groupId, 'elements', action.id, 'type'], action.inputType);
    case nodeActionTypes.LOAD_PATCH_FROM_FILE:
      return action.virtualInputGroups;
    case inputActionTypes.INPUTCONFIG_DELETE_INPUT:
      return removeElementFromGroups(state, action.inputId);
    case inputgroupsActionTypes.TOGGLE_VISIBILITY:
      return state.setIn(['groups', action.groupId, 'isVisible'], action.isVisible);
    case inputgroupsActionTypes.RENAME_GROUP:
      return state.setIn(['groups', action.groupId, 'name'], action.name);
    case patchActionTypes.RESET_PATCH:
      return getInitialState();
    default:
      return state;
  }
}

export const getInitialState = () => {
  return Map({
    groups: Map()
  });
}


export default inputgroups;