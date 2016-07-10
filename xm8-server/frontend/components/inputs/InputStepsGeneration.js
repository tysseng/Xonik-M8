const InputStepsGeneration = ({ input, onStepGenerationModeChange, onStepIntervalChange, onNumberOfStepsChange }) => {

  return (
    <div>
      <label>Steps</label>
      <div className="radio">
        <select value={input.stepGenerationMode} onChange={(e) => {onStepGenerationModeChange(input.id, e.target.value)}}>
          <option value='CONTINOUS'>Continous</option>
          <option value='PREDEFINED_INTERVAL'>Set interval</option>
          <option value='NUMBER_OF_STEPS'>Set number of steps</option>
          <option value='OPTIONS'>Use predefined options</option>
        </select>      
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