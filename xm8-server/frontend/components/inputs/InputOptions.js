import _ from 'lodash';

import InputOption from './InputOption';

const InputOptions = ({ input, onLabelChange, onValueMidiChange, onValueChange, onDelete, onNew, onSpreadValues, onSpreadValuesMidi  }) => {

  if(!input){
    return null;
  }

  let { scale, options } = input;  

  return (
    <div className='configPane'>        
      <div className="heading">Options</div>
      <div className='contents inputOptions'>
        <button className='addButton' type='button' onClick={() => onNew(input.id)}>Add new</button>
        { Object.keys(options).length > 0 && 
          <table>
            <thead>
              <tr><th>Label</th><th>Value</th><th>Midi</th></tr>
            </thead>
            <tbody>          
              {Object.values(options).map(option => {
                return <InputOption 
                  option={option} 
                  scale={scale} 
                  onLabelChange={onLabelChange} 
                  onValueMidiChange={onValueMidiChange} 
                  onValueChange={onValueChange} 
                  onDelete={onDelete}/>
              })}
              <tr>
                <td></td>
                <td><button type='button' onClick={onSpreadValues}>Spread</button></td>
                <td><button type='button' onClick={onSpreadValuesMidi}>Spread</button></td>
              </tr>
            </tbody>
          </table>
        }        
      </div>    
    </div>        
  )
}

export default InputOptions;