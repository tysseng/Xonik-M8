import MiniIcon from '../../framework/MiniIcon';
import MidiFormContainer from '../MidiFormContainer';
import DisplayOptionsFormContainer from '../DisplayOptionsFormContainer';
import InputOptionsContainer from '../InputOptionsContainer';
import InputPreview from '../InputPreview';
import PanelControllerDropdown from '../PanelControllerDropdown';
import InputDropdown from '../InputDropdown';
import { panelControllersById } from '../../../../shared/graph/PanelControllers';
import { inputStepGenerationTypesById } from '../../../../shared/inputs/InputStepsGenerationTypes';

const VirtualInputForm = ({ input, inputValue,
  selectInput, onCloseDialog, 
  rename, renameShort, 
  onControllerChange }) => {

  let selectedId = input ? input.id : '';

  return (
    <div>

      <div className='inputForm'>
        <div className="tricol-left">      
          <div className='configPane'>
            <div className="heading">Selected input<MiniIcon label="Close" icon="cancel.svg" onClick={onCloseDialog}/></div>

            <div className='contents'>
              <div>
                <InputDropdown type='virtualInputs' value={selectedId} onChange={selectInput}/>
              </div>
            </div>
          </div>
          { input &&
            <div>
              <div className='configPane'>
                <div className="heading">Input<MiniIcon label="Close" icon="cancel.svg" onClick={onCloseDialog}/></div>

                <div className='contents'>
                  <div>
                    <label htmlFor="name">Full name</label>           
                    <input id="name" type="text" value={input.name.full} onChange={(e) => rename(input.id, e.target.value)}/>

                    <label htmlFor="shortname">Short name</label>           
                    <input id="shortname" type="text" value={input.name.short} onChange={(e) => renameShort(input.id, e.target.value)}/>

                    <label>Panel controller</label> 
                    <PanelControllerDropdown value={input.panelController} onControllerChange={(value) => onControllerChange(input.id, value)}/>                    
                  </div>
                </div>
              </div>
              { input.panelController === panelControllersById.PC_VIRTUAL.id &&
                <MidiFormContainer id={input.id} midi={input.midi}/>
              }
            </div>
          }
        </div>
        <div className="tricol-left">
          { input && 
            <DisplayOptionsFormContainer input={input}/> 
          }

          { input && input.stepGenerationMode === inputStepGenerationTypesById.OPTIONS.id &&
            <InputOptionsContainer input={input}/>
          }
        </div>
        <div className="tricol-left">
          { input && 
            <InputPreview input={input} value={inputValue}/>
          }      
        </div>      
      </div>
    </div>
  )
}

export default VirtualInputForm;