import MiniIcon from '../framework/MiniIcon';
import {unitsById} from '../../../shared/graph/ParameterUnits';
import { panelControllersById } from '../../../shared/graph/PanelControllers';

const onChange = (index, value, converter, callback) => {
  let convertedValue = '';

  if(value){
    convertedValue = converter(value);

    //TODO: Crop decimal string to current precision level
  }

  callback(index, convertedValue);
}


const InputOption = ({ input, scale, option, onLabelChange, onValueMidiChange, onValueChange, onDelete }) => {

  let unit = unitsById[scale];
  let value = unit.converters.to(option.value);
  let from = unit.converters.from;

  return (

    <tr>
      <td><input className='label' type='text' value={option.label} onChange={e => onLabelChange(option.index, e.target.value)}/></td>
      <td><input className='value' type='text' value={value} onChange={e => onChange(option.index, e.target.value, from, onValueChange)}/></td>
      { input.panelController === panelControllersById.PC_VIRTUAL.id && <td><input className='value' type='text' value={option.valuemidi} onChange={e => onValueMidiChange(option.index, e.target.value)}/></td> }
      <td><MiniIcon label="Delete" icon="garbage.svg" onClick={() => onDelete(option.index)}/></td>
    </tr>
  )
}

export default InputOption;