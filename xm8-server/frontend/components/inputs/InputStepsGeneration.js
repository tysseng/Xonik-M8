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
        <label>Step interval
          <input type="text" value={input.stepInterval} onChange={(e) => onStepIntervalChange(input.id, e.target.value)}/>
        </label>
      )}
      {input.stepGenerationMode === 'NUMBER_OF_STEPS' && (
        <label>Number of steps
          <input type="text" value={input.numberOfSteps} onChange={(e) => onNumberOfStepsChange(input.id, e.target.value)}/>
        </label>
      )}
    </div>
  );
}

export default InputStepsGeneration;