import { Map } from 'immutable';
import { getUpdatedState } from './reducerTools';

// Element in a group id is equal to whatever the element contains - input id if it is an id etc.

export const emptyState =Map({
  groups: Map()
});

const inputgroups = (state, action) => {
  switch(action.type) {
    case 'SET_STATE':
      let updatedState = getUpdatedState(['inputgroups'], action);
      if (updatedState) {
        return state.merge(updatedState);
      }
      break;
    default:
      return state;
  }
}

export default inputgroups;
