let undobuffer = {
  groups: {}
}

export const push = (groupId, description, state) => {
  if(!undobuffer.groups[groupId]){
    undobuffer.groups[groupId] = {
      position: -1,
      contents: []
    };
  } 

  let group = undobuffer.groups[groupId];

  // trunkate buffer, a new push should make
  // redo impossible.

  group.contents.length = group.position+1;

  group.contents.push({
    description,
    state
  });

}

export const undo = (groupId, undoToPosition) => {

  let group = undobuffer.groups[groupId];

  if(position > -1){
    if(Number.isInteger(undoToPosition)){
      group.position = undoToPosition;
      return group.contents[undoToPosition];
    } else {
      return group[position--];
    }
  }
}

export const redo = (groupId, redoToPosition) => {

  let group = undobuffer.groups[groupId];

    if(Number.isInteger(redoToPosition)){
      if(redoToPosition < group.contents.length ){
      group.position = redoToPosition;
      return group.contents[redoToPosition];
    } else {
      if(position <= group.contents.length - 1){
        return group[position++];
      }
    }
  }
}

export const buffer = (groupId) => {
  return undobuffer.groups[groupId];
}