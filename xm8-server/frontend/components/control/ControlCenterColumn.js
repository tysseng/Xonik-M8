import React from 'react';
import ControllerGroup from './ControllerGroup';

const ControlCenterColumn = ({groups, inputs, inputValues, onControllerChange}) => {
  return (
    <div>
      <div>Controls</div>
      <div>
        {
          Object.values(groups).map(group => {
            return <ControllerGroup group={group} inputs={inputs} inputValues={inputValues} onControllerChange={onControllerChange}/>
          })
        }
      </div>
    </div>
  )

}

export default ControlCenterColumn;