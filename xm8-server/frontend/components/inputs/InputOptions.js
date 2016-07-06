import _ from 'lodash';

import InputOption from './InputOption';

const InputOptions = ({ options, onLabelChange, onValueMidiChange, onValueChange, onDelete, onNew, onSpreadValues, onSpreadValuesMidi  }) => {

  if(!options){
    return null;
  }



  return (
    <div className='configPane'>        
      <div className="heading">Options</div>
      <div className='contents inputOptions'>
        { Object.keys(options).length > 0 && 
          <table>
            <thead>
              <tr><th>Label</th><th>Value</th><th>Midi</th></tr>
            </thead>
            <tbody>          
              {Object.values(options).map(option => {
                return <InputOption option={option} onLabelChange={onLabelChange} onValueMidiChange={onValueMidiChange} onValueChange={onValueChange} onDelete={onDelete}/>
              })}
              <tr><td></td><td><button type='button' onClick={onSpreadValues}>Spread</button></td><td><button type='button' onClick={onSpreadValuesMidi}>Spread</button></td></tr>
            </tbody>
          </table>
        }
        <button type='button' onClick={onNew}>Add new</button>
      </div>    
    </div>        
  )
}

export default InputOptions;