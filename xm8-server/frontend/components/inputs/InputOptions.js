import InputOption from './InputOption';
import { panelControllersById } from '../../../shared/graph/PanelControllers'

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
              <tr>
                <th>Label</th>
                <th>Value</th>
                { input.panelController === panelControllersById.PC_VIRTUAL.id && <th>Midi</th>}
              </tr>
            </thead>
            <tbody>          
              {Object.values(options).map(option => {
                return <InputOption
                  input={input}
                  option={option} 
                  scale={scale} 
                  onLabelChange={onLabelChange} 
                  onValueMidiChange={onValueMidiChange} 
                  onValueChange={onValueChange} 
                  onDelete={onDelete}/>
              })}
              <tr>
                <td></td>
                <td><button type='button' onClick={() => onSpreadValues(input)}>Spread</button></td>
                { input.panelController === panelControllersById.PC_VIRTUAL.id && <td><button type='button' onClick={() => onSpreadValuesMidi(input)}>Spread</button></td>}
              </tr>
            </tbody>
          </table>
        }        
      </div>    
    </div>        
  )
}

export default InputOptions;