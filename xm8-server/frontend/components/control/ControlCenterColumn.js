import React from 'react';
import ControllerGroup from './ControllerGroup';

const ControlCenterColumn = ({selectedGroup, inputs, inputValues, onControllerChange}) => {

  if(!selectedGroup || selectedGroup.isVisible === false){
    return null;
  }
  console.log("something", selectedGroup)
  return (
    <div>
      <div>{selectedGroup.name}</div>
      <div>
        <ControllerGroup group={selectedGroup} inputs={inputs} inputValues={inputValues} onControllerChange={onControllerChange}/>
      </div>
    </div>
  )

}

export default ControlCenterColumn;