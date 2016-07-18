import React from 'react'
import InputTypesDropdown from './InputTypesDropdown';
import UnitDropdown from '../graph/ParameterUnitDropdown';
import InputRange from './InputRange';
import InputStepsGeneration from './InputStepsGeneration';

const DisplayOptionsForm = ({
  input,
  onScaleChange, 
  onTypeChange, 
  onMinChange, 
  onMaxChange,
  onStepGenerationModeChange, 
  onStepIntervalChange, 
  onNumberOfStepsChange
}) => {

  return (
    <div className='configPane'>
      <div className="heading">Display options</div>

      <div className='contents'>
        <label>Show as</label> 
        <InputTypesDropdown onTypeChange={(value) => onTypeChange(input.id, value)} value={input.type}/>

        <label>Scale</label> 
        <UnitDropdown onUnitChange={(value) => onScaleChange(input.id, value)} value={input.scale}/>

        <label>Range</label>
        <InputRange 
          scale={input.scale} min={input.min} max={input.max}
          onMinChange={(value) => onMinChange(input.id, value)} onMaxChange={(value) => onMaxChange(input.id, value)}/>
        
        <InputStepsGeneration
          input={input}
          onStepGenerationModeChange={onStepGenerationModeChange}
          onStepIntervalChange={onStepIntervalChange}
          onNumberOfStepsChange={onNumberOfStepsChange}/>
      </div>
    </div>       
  )
}

export default DisplayOptionsForm;