// TODO: Move this to middleware?
import _ from 'lodash';
import { types as undoActionTypes } from '../../shared/state/actions/undo';
import { init, undo, redo, peek, pushToUndobuffer } from '../../shared/state/undobuffer';

export const getUndoWrapper = (undoGroup, undoableActions, reducer, getInitialState) => {

  init(undoGroup, 'Start', getInitialState());

  return (state, action) => {
    // All undoable actions must have an undo group, which will
    // be used both to detect undoable actions and to separate
    // actions into different undo buffers.
    if(action.undoGroup && action.undoGroup === undoGroup || _.includes(undoableActions, action.type)){
      switch(action.type){
        case undoActionTypes.UNDO:
          return undo(action.undoGroup, state);
        case undoActionTypes.REDO:
          return redo(action.undoGroup, state);
        default:
          state = reducer(state, action);

          // only add to undo list if something actually changed.
          let previousUndoState = peek(undoGroup, action);
          if(previousUndoState !== state) {
            pushToUndobuffer(undoGroup, action.undoDescription, state);
          }
          return state;
      }  
    }

    return reducer(state, action);
  }
}
