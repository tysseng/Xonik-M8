import {unitsById} from '../../../shared/graph/ParameterUnits'

const onChange = (value, converter, callback) => {
  let convertedValue = '';

  if(value){
    convertedValue = converter(value);
  }

  callback(convertedValue);
}

const InputRange = ({scale, min, max, onMinChange, onMaxChange}) => {

  let unit = unitsById[scale];
  let minConverted = unit.converters.to(min);
  let maxConverted = unit.converters.to(max);

  let from = unit.converters.from;

  return (
    <div className='range'>
      <input type='text' value={minConverted} onChange={e => onChange(e.target.value, from, onMinChange)}/>
      <span>to</span> <input type='text' value={maxConverted} onChange={e => onChange(e.target.value, from, onMaxChange)}/>
    </div>
  )
}

export default InputRange;