import {Map} from 'immutable';

import config from '../../../shared/config';
import { getPerPatchWrapper } from './reducerTools';

import { emptyState as emptyGraphState } from './graph';
import { emptyState as emptyMatrixState } from './matrix';
import { emptyState as emptyVirtualInputsState } from './virtualinputs';
import { emptyState as emptyInputGroupsState } from './inputgroups';

import graph from './graph';
import matrix from './matrix';
import virtualInputs from './virtualinputs';
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

const patches = getPerPatchWrapper({
  emptyState,
  wrappedReducer: patch,
  updateStatePath: 'patches'
});

export default patches;