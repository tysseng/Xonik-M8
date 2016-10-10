import {
  inputStepGenerationTypesById as typesById,
  inputStepGenerationTypes as types
} from '../../../shared/inputs/InputStepsGenerationTypes';

const InputStepsGeneration = ({ input, onStepGenerationModeChange, onStepIntervalChange, onNumberOfStepsChange }) => {

  return (
    <div>
      <label>Steps</label>
      <div className="radio">
        <select value={input.stepGenerationMode} onChange={(e) => {onStepGenerationModeChange(input.id, e.target.value)}}>
          {types.map(value => {
            return <option key={value.id} value={value.id}>{value.label}</option>
          })}
        </select>
      </div>
      {input.stepGenerationMode === typesById.PREDEFINED_INTERVAL.id && (
        <div>
          <label>Step interval</label>
          <input type="text" value={input.stepInterval} onChange={(e) => onStepIntervalChange(input.id, e.target.value)}/>
        </div>
      )}
      {input.stepGenerationMode === typesById.NUMBER_OF_STEPS.id && (
        <div>
          <label>Number of steps</label>
          <input type="text" value={input.numberOfSteps} onChange={(e) => onNumberOfStepsChange(input.id, e.target.value)}/>
        </div>        
      )}
    </div>
  );
}

export default InputStepsGeneration;