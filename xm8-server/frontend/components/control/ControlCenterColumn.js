import React from 'react';
import Fader from './Fader';
import ControllerGroup from './ControllerGroup';

const ControlCenterColumn = ({groups, inputs, onControllerChange}) => {
  return ( 
    <div>
      <div>Controls</div>
      <div className="controllerRow">
        <ControllerGroup group={groups.AMP_ENV} inputs={inputs} onControllerChange={onControllerChange}/>
        <ControllerGroup group={groups.FILTER_1_ENV} inputs={inputs} onControllerChange={onControllerChange}/>
      </div>
    </div>
  )

}

export default ControlCenterColumn;