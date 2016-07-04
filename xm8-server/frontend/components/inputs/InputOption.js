import MiniIcon from '../framework/MiniIcon';

const InputOptions = ({ option }) => {

  return (

    <tr>
      <td><input className='label' type='text' value={option.label}/></td>
      <td><input className='value' type='text' value={option.value}/></td>
      <td><input className='value' type='text' value={option.valuemidi}/></td>
      <td><MiniIcon label="Delete" icon="garbage.svg"/></td>
    </tr>
  )
}

export default InputOptions;