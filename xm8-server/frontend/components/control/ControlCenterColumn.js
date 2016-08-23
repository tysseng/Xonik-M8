import React from 'react';
import ControllerGroup from './ControllerGroup';

const ControlCenterColumn = ({selectedGroupId, groups, inputs, inputValues, onControllerChange, selectGroup}) => {
  return (
    <div>
      <div>Controls</div>
      <div>
        {
          Object.values(groups).map(group => {
            return <div key={group.id} onClick={() => selectGroup(group.id)}>{group.name}</div>
          })
        }
      </div>
      <div>
        {
          selectedGroupId &&
          groups[selectedGroupId] &&
          <ControllerGroup group={groups[selectedGroupId]} inputs={inputs} inputValues={inputValues} onControllerChange={onControllerChange}/>
        }
      </div>
    </div>
  )

}

export default ControlCenterColumn;