import isInteger from 'is-integer';

let undobuffer = {
  groups: {}
}

export const pushToUndobuffer = (groupId, description, state) => {
  if(!undobuffer.groups[groupId]){
    undobuffer.groups[groupId] = {
      position: -1,
      contents: []
    };
  } 

  let group = undobuffer.groups[groupId];

  group.position += 1;

  // trunkate buffer, a new push should make
  // redo impossible.
  group.contents.length = group.position;

  let undoElement = {
    description,
    state
  };

  group.contents.push(undoElement);

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

export const buffer = (groupId) => {
  return undobuffer.groups[groupId];
}