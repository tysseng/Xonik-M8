// TODO: Move this to middleware?
import _ from 'lodash';
import { types as undoActionTypes } from '../../shared/state/actions/undo';
import { undo, redo, pushToUndobuffer } from '../../shared/state/undobuffer';

// Adds subgroup to undoGroup name to separate
// undo on a per voice basis. This lets us split the undo
// buffer in a single reducer into separate containers, for
// example to get per-patch undo without special logic in the
// patches reducer
const getUndoGroupId = (undoGroupId, action) => {
  if(action.undoSubGroup){
    return undoGroupId + action.undoSubGroup;
  } else {
    return undoGroupId;
  }
}

export const getUndoWrapper = (undoGroup, undoableActions, reducer, getInitialState) => {

  pushToUndobuffer(undoGroup, 'Start', getInitialState());

  return (state, action) => {
    // All undoable actions must have an undo group, which will
    // be used both to detect undoable actions and to separate
    // actions into different undo buffers.
    if(action.undoGroup && action.undoGroup === undoGroup || _.includes(undoableActions, action.type)){
      switch(action.type){
        case undoActionTypes.UNDO:
          return undo(getUndoGroupId(action.undoGroup, action), state);
        case undoActionTypes.REDO:
          return redo(getUndoGroupId(action.undoGroup, action), state);
        default:
          state = reducer(state, action);
          pushToUndobuffer(getUndoGroupId(undoGroup, action), action.undoDescription, state);
          return state;
      }  
    }

    return reducer(state, action);
  }
}
