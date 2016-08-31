import {Map} from 'immutable';

import { getUndoWrapper } from './undo';
import { groups as undoGroups } from '../../shared/state/actions/undo';
import config from '../../shared/config';

import { getInitialState as getInitialGraphState } from './graph';
import { getInitialState as getInitialMatrixState } from './matrix';
import { getInitialVirtualState as getInitialVirtualInputState } from './inputs';
import { getInitialState as getInitialInputGroupsState } from './inputgroups';

import graph from './graph';
import matrix from './matrix';
import { virtualInputs } from './inputs';
import inputgroups from './inputgroups';

/*
 main patches reducer, includes all sub reducers for patches for all voice groups
  */
const patch = (state, action) => {

  return state
    .updateIn(['graph'], substate => graph(substate, action))
    .updateIn(['matrix'], substate => matrix(substate, action))
    .updateIn(['virtualInputs'], substate => virtualInputs(substate, action))
    .updateIn(['inputgroups'], substate => inputgroups(substate, action))
}

const getInitialPatchState = () => {
  return new Map({
    graph: getInitialGraphState(),
    matrix: getInitialMatrixState(),
    virtualInputs: getInitialVirtualInputState(),
    inputgroups: getInitialInputGroupsState()
  });
}

const getInitialState = () => {
  let patches = new Map();
  for(let i=0; i<config.voices.numberOfGroups; i++){
    patches = patches.set('' + i, getInitialPatchState());
  }
  return patches;
}

const patches = (state = getInitialState(), action) => {
  // TODO: Change later.
  action.patchNumber = '0';
  if(action.patchNumber) {
    return state.updateIn([action.patchNumber], patchState => patch(patchState, action))
  } else {
    return state;
  }
}

//const undoWrapper = getUndoWrapper(undoGroups.PATCH, undoableActions, patches, getInitialState);

//export default undoWrapper;

export default patches;