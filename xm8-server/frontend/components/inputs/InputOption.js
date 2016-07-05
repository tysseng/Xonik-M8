import MiniIcon from '../framework/MiniIcon';

const InputOption = ({ option, onLabelChange, onValueMidiChange, onValueChange, onDelete }) => {

  return (

    <tr>
      <td><input className='label' type='text' value={option.label} onChange={e => onLabelChange(option.index, e.target.value)}/></td>
      <td><input className='value' type='text' value={option.value} onChange={e => onValueChange(option.index, e.target.value)}/></td>
      <td><input className='value' type='text' value={option.valuemidi} onChange={e => onValueMidiChange(option.index, e.target.value)}/></td>
      <td><MiniIcon label="Delete" icon="garbage.svg" onClick={() => onDelete(option.index)}/></td>
    </tr>
  )
}

export default InputOption;