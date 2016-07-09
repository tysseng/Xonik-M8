import {RadioGroup, Radio} from 'react-radio-group';

const InputStepsGeneration = ({ input, onStepGenerationModeChange, onStepIntervalChange, onNumberOfStepsChange }) => {

  console.log('stepmode', input.stepGenerationMode);

  return (
    <div>
      <label>Steps</label>
      <div className="radio">
        <RadioGroup onChange={(value) => onStepGenerationModeChange(input.id, value)} selectedValue={input.stepGenerationMode}>
          <label><Radio value='CONTINOUS'/>Continous</label>
          <label><Radio value='PREDEFINED_INTERVAL'/>Set interval</label>
          <label><Radio value='NUMBER_OF_STEPS'/>Set number of steps</label>
          <label><Radio value='OPTIONS'/>Use predefined options</label>
        </RadioGroup>
      </div>
      {input.stepGenerationMode === 'PREDEFINED_INTERVAL' && (
        <div>
          <label>Step interval</label>
          <input type="text" value={input.stepInterval} onChange={(e) => onStepIntervalChange(input.id, e.target.value)}/>
        </div>
      )}
      {input.stepGenerationMode === 'NUMBER_OF_STEPS' && (
        <div>
          <label>Number of steps</label>
          <input type="text" value={input.numberOfSteps} onChange={(e) => onNumberOfStepsChange(input.id, e.target.value)}/>
        </div>        
      )}
    </div>
  );
}

export default InputStepsGeneration;