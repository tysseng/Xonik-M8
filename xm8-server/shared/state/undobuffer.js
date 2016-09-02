import isInteger from 'is-integer';

let undobuffer = {
  groups: {}
}

export const init = (groupId, description, initialState) => {
  undobuffer.groups[groupId] = {
    position: 0,
    contents: [getUndoElement(description, initialState)]
  };
}

const getUndoElement = (description, state) => ({
  description,
  state
});

export const pushToUndobuffer = (groupId, description, state) => {

  let group = undobuffer.groups[groupId];

  // Truncate buffer, a new push should make
  // redo impossible.
  group.contents.length = group.position + 1;

  group.contents.push(getUndoElement(description, state));

  group.position++;
}

export const undo = (groupId, state, undoToPosition) => {
  let group = undobuffer.groups[groupId];

  if(!isInteger(undoToPosition)){      
    undoToPosition = group.position - 1;
  }

  if(undoToPosition > -1){
    group.position = undoToPosition;
    return group.contents[group.position].state;
  }

  return state;
}

export const redo = (groupId, state, redoToPosition) => {
  let group = undobuffer.groups[groupId];

  if(!isInteger(redoToPosition)){
    redoToPosition = group.position + 1;
  }

  if(redoToPosition < group.contents.length ){
    group.position = redoToPosition;
    return group.contents[group.position].state;
  }

  return state;
}

export const peek = (groupId) => {
  let group = undobuffer.groups[groupId];
  return group.contents[group.position].state;
}

export const buffer = (groupId) => {
  return undobuffer.groups[groupId];
}