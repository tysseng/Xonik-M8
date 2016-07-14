import {Map} from 'immutable';
import {inputgridActionTypes} from '../../shared/state/actions/inputgrid';

const newGroup = (id) => {
  return Map({
    id,
    elements: Map()
  });
}

const getWrappedElement = (id, offsetXem, offsetYem, elementId) => {
  return Map({
    id,
    elementId,
    offset: Map({
      x: offsetXem,
      y: offsetYem
    })
  })
}

const inputgrid = (
  state = Map({
    offset: Map({
      x: 0, 
      y: 0
    }),
    groups: Map({})
  }), 
  action) => {

  switch(action.type){
    case inputgridActionTypes.MOVE_ELEMENT:
      return state        
        .setIn(['offset', 'x'], action.offsetXem)
        .setIn(['offset', 'y'], action.offsetYem);
    case inputgridActionTypes.NEW_GROUP:
      return state.setIn(['groups', action.groupId], newGroup(action.groupId))
        //TODO: TEMPORARY, REMOVE
        .set('selectedGroup', action.groupId);
    case inputgridActionTypes.LOAD_GROUP:
      return state;
    case inputgridActionTypes.ADD_ELEMENT:
      let wrappedElement = getWrappedElement(action.id, action.offsetXem, action.offsetYem, action.elementId, action.elementType);
      return state.setIn(['groups', action.groupId, 'elements', action.id], wrappedElement);
    case inputgridActionTypes.DELETE_ELEMENT:
      return state.deleteIn(['groups', action.groupId, 'elements', action.id]);
  } 
  return state;
}

export default inputgrid;