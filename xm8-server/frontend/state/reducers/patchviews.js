import { Map } from 'immutable';
import { getPatchNum } from './reducerTools';
import config from '../../../shared/config';
import { getPerPatchWrapper } from './reducerTools';

const emptyState = (() => {
  let patchviews = new Map();
  for(let i=0; i<config.voices.numberOfGroups; i++){
    patchviews = patchviews.set(getPatchNum(i), Map({shouldAutoUpdate: false, patch: Map()}));
  }
  return patchviews;
})();

const patchview = (state, action) => {
  switch (action.type){
    case 'SET_STATE':
      return state.merge(action.state);
    default:
      return state;
  }
};

const patchviews = getPerPatchWrapper({
  emptyState,
  wrappedReducer: patchview,
  updateStatePath: 'patchviews'
});

export default patchviews