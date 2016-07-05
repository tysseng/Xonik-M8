import _ from 'lodash';

import InputOption from './InputOption';

const InputOptions = ({ options, onLabelChange, onValueMidiChange, onValueChange, onDelete, onNew  }) => {

  if(!options){
    return null;
  }

  return (
    <div className='inputOptions'>
      <div>Options</div>      
      <table>
        <thead>
          <tr><th>Label</th><th>Value</th><th>Midi</th></tr>
        </thead>
        <tbody>          
          {Object.values(options).map(option => {
            return <InputOption option={option} onLabelChange={onLabelChange} onValueMidiChange={onValueMidiChange} onValueChange={onValueChange} onDelete={onDelete}/>
          })}
          <tr><td></td><td>Uniform</td><td>Uniform</td></tr>
        </tbody>
      </table>
      <button type='button' onClick={onNew}>Add new</button>
    </div>    
  )
}

export default InputOptions;