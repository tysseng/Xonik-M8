import {Map} from 'immutable';

import config from '../../../shared/config';

import { emptyState as emptyGraphState } from './graph';
import { emptyState as emptyMatrixState } from './matrix';
import { emptyState as emptyVirtualInputsState } from './inputs';
import { emptyState as emptyInputGroupsState } from './inputgroups';

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

const emptyPatchState = new Map({
  graph: emptyGraphState,
  matrix: emptyMatrixState,
  virtualInputs: emptyVirtualInputsState,
  inputgroups: emptyInputGroupsState
});

const emptyState = (() => {
  let patches = new Map();
  for(let i=0; i<config.voices.numberOfGroups; i++){
    patches = patches.set('' + i, emptyPatchState);
  }
  return patches;
})();

const patches = (state = emptyState, action) => {

  // TODO: Change later.
  action.patchNumber = '0';
  if(action.patchNumber) {
    return state.updateIn([action.patchNumber], patchState => patch(patchState, action))
  } else {
    return state;
  }
}
export default patches;