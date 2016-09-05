import config from '../../shared/config';

// converts patch number to string
export const getPatchNum = (patchNumber) => '' + patchNumber;

export const initChangeTrackerForPatches = () => {
  let initialChanges = {};
  for(let i=0; i<config.voices.numberOfGroups; i++){
    initialChanges[getPatchNum(i)] = false;
  }

  return {
    hasChanged: initialChanges,
    set: function(patchNumber) { this.hasChanged[patchNumber] = true},
    clear: function(patchNumber) {this.hasChanged[patchNumber] = false}
  }
};
