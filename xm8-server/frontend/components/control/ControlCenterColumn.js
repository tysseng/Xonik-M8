import React from 'react';
import Fader from './Fader';
import ControllerGroup from './ControllerGroup';

const ControlCenterColumn = ({groups, inputs}) => {
  return ( 
    <div>
      <div>Controls</div>
      <div className="controllerRow">
        <ControllerGroup group={groups.AMP_ENV} inputs={inputs}/>
        <ControllerGroup group={groups.FILTER_1_ENV} inputs={inputs}/>
      </div>
    </div>
  )

}

export default ControlCenterColumn;