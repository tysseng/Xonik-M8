// TODO: Move this to middleware?
import { types as undoActionTypes } from '../../shared/state/actions/undo';
import { undo, redo, pushToUndobuffer } from '../../shared/state/undobuffer';

export const getUndoWrapper = (undoGroup, reducer, getInitialState) => {

  pushToUndobuffer(undoGroup, 'Start', getInitialState());

  return (state, action) => {

    // All undoable actions must have an undo group, which will
    // be used both to detect undoable actions and to separate
    // actions into different undo buffers.
    if(action.undoGroup && action.undoGroup === undoGroup){
      switch(action.type){
        case undoActionTypes.UNDO:
          return undo(action.undoGroup, state);
        case undoActionTypes.REDO:
          return redo(action.undoGroup, state);
        default:
          state = reducer(state, action);
          pushToUndobuffer(undoGroup, action.undoDescription, state);
          return state;
      }  
    }

    return reducer(state, action);
  }
}
