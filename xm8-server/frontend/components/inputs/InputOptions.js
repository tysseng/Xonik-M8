import _ from 'lodash';

import InputOption from './InputOption';

const InputOptions = ({ options }) => {

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
          {options.map(option => {
            return <InputOption option={option}/>
          })}
          <tr><td></td><td>Uniform</td><td>Uniform</td></tr>
        </tbody>
      </table>
      <div>Add new</div>
    </div>    
  )
}

export default InputOptions;