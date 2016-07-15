import {inputTypes} from '../../../shared/inputs/InputTypes.js';

const InputTypesDropdown = ({value, onTypeChange, showDefault = false}) => (
  <select value={value} onChange={(e) => (onTypeChange(e.target.value))}>
    {showDefault && <option key='default' value={''}>Default</option>}
    {inputTypes.map(inputType => {
      return <option key={inputType.id} value={inputType.id}>{inputType.name}</option>
    })}
  </select>
)

export default InputTypesDropdown;