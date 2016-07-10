import React from 'react';
import Fader from './Fader';
import ControllerGroup from './ControllerGroup';
import InputGrid from '../inputgrid/InputGrid';
/*
      <div>Controls</div>
      <div className="controllerRow">
        <ControllerGroup group={groups.AMP_ENV} inputs={inputs} inputValues={inputValues} onControllerChange={onControllerChange}/>
        <ControllerGroup group={groups.FILTER_1_ENV} inputs={inputs} inputValues={inputValues} onControllerChange={onControllerChange}/>
      </div>
      */
const ControlCenterColumn = ({groups, inputs, inputValues, onControllerChange}) => {
  return ( 
    <div>
      <InputGrid/>

    </div>
  )

}

export default ControlCenterColumn;