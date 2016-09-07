import { Map } from 'immutable';

import config from '../../shared/config';
import { autosaver } from '../patch/patchRepository';
import { getUndoWrapper } from './undo';
import { groups as undoGroups, types as undoActionTypes } from '../../shared/state/actions/undo';
import { types } from '../../shared/state/actions/patch';
import { getPatchNum } from './reducerTools';

import { emptyState as emptyGraphState, undoableActions as undoableGraphActions } from './graph';
import { emptyState as emptyMatrixState, undoableActions as undoableMatrixActions } from './matrix';
import { emptyVirtualState as emptyVirtualInputsState, undoableActions as undoableInputActions } from './inputs';
import { emptyState as emptyInputGroupsState, undoableActions as undoableInputGroupsActions } from './inputgroups';

import graph from './graph';
import matrix from './matrix';
import inputgroups from './inputgroups';
import { virtualInputs } from './inputs';
import changeTracker from './patchesChangeTracker';

// join all undoable actions from the sub reducers
const undoableActions = undoableGraphActions
  .concat(undoableMatrixActions)
  .concat(undoableInputActions)
  .concat(undoableInputGroupsActions)
  .concat(types.LOAD_PATCH_FROM_FILE);


/*
 main patches reducer, includes all sub reducers for patches for all voice groups
  */
const patch = (state, action) => {
  switch(action.type) {
    case types.LOAD_PATCH_FROM_FILE:
      return action.patch;
    default:
      return state
        .updateIn(['graph'], substate => graph(substate, action))
        .updateIn(['matrix'], substate => matrix(substate, action))
        .updateIn(['virtualInputs'], substate => virtualInputs(substate, action))
        .updateIn(['inputgroups'], substate => inputgroups(substate, action));
  }
}

const emptyPatchState = (() => {
  let patchStates = [];
  for(let i=0; i<config.voices.numberOfGroups; i++){
    let autosaved = autosaver.getAutosaved(getPatchNum(i));
    if(autosaved){
      patchStates.push(autosaved);
    } else {
      patchStates.push(new Map({
        graph: emptyGraphState,
        matrix: emptyMatrixState,
        virtualInputs: emptyVirtualInputsState,
        inputgroups: emptyInputGroupsState
      }));
    }
  }
  return patchStates;
})();

const emptyState = (() => {
  let patches = new Map();
  for(let i=0; i<config.voices.numberOfGroups; i++){
    // the same initial state is reused, but this is no problem as it
    // is immutable, changes to state won't bleed across patches.
    patches = patches.set(getPatchNum(i), emptyPatchState[i]);
  }
  return patches;
})();

// create one undo wrapper per patch
let patchUndoReducers = [];
for(let i=0; i<config.voices.numberOfGroups; i++){
  let undoWrapper = getUndoWrapper({
    undoGroup: undoGroups.PATCH + i,
    undoableActions: undoableActions,
    reducer: patch,
    initialState: emptyPatchState[i],
    changeListener: changeTracker.set.bind(null, getPatchNum(i))
  });

  patchUndoReducers[getPatchNum(i)] = undoWrapper;
}

const patches = (state = emptyState, action) => {
  if(action.patchNumber) {
    return state.updateIn([action.patchNumber], patchState => patchUndoReducers[action.patchNumber](patchState, action))
  } else {
    return state;
  }
}

export default patches;