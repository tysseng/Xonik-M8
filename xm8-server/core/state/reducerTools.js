import config from '../../shared/config';

// converts patch number to string
export const getPatchNum = (patchNumber) => '' + patchNumber;

export const initChangeTrackerForPatches = () => {
  let hasChanged = {};
  for(let i=0; i<config.voices.numberOfGroups; i++){
    hasChanged[getPatchNum(i)] = false;
  }

  return {
    hasChanged,
    set: function(patchNumber) { hasChanged[patchNumber] = true},
    clear: function(patchNumber) {hasChanged[patchNumber] = false}
  }
};
