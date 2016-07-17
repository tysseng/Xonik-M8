//TODO: Add 'not selected' to midi dropdowns
//TODO: Add 'transmit midi', 'receive midi' checkboxes

import _ from 'lodash';

import MiniIcon from '../framework/MiniIcon';

import inputTypes from '../../../shared/inputs/InputTypes';
import MidiFormContainer from './MidiFormContainer';
import InputOptionsContainer from './InputOptionsContainer';
import InputPreview from './InputPreview';
import PanelControllerDropdown from './PanelControllerDropdown';
import InputTypesDropdown from './InputTypesDropdown';
import InputRange from './InputRange';
import InputStepsGeneration from './InputStepsGeneration';
import FileDialogContainer from '../filesystem/FileDialogContainer';

import UnitDropdown from '../matrix/ParameterUnitDropdown';
import InputDropdown from './InputDropdown';

const InputForm = ({ input, inputValue, showFileDialog,
  selectInput, onCloseDialog, 
  rename, renameShort, 
  onScaleChange, onTypeChange, onControllerChange,
  onStepGenerationModeChange, onStepIntervalChange, onNumberOfStepsChange,
  onMinChange, onMaxChange }) => {

  let selectedId = input ? input.id : '';

  return (
    <div>
      {showFileDialog && <FileDialogContainer path='/inputs' headingPostfix='inputs' saveUrl='/api/inputs/save' loadUrl = '/api/inputs/load'/> } 
      <div className='inputForm'>
        <div className="tricol-left">      
          <div className='configPane'>
            <div className="heading">Selected input<MiniIcon label="Close" icon="cancel.svg" onClick={onCloseDialog}/></div>

            <div className='contents'>
              <div>
                <InputDropdown value={selectedId} onChange={selectInput}/>
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

              <MidiFormContainer id={input.id} midi={input.midi}/> 
            </div>
          }
        </div>
        <div className="tricol-left">
          { input &&
              <div className='configPane'>
                <div className="heading">Display options</div>

                <div className='contents'>
                  <label>Show as</label> 
                  <InputTypesDropdown onTypeChange={(value) => onTypeChange(input.id, value)} value={input.type}/>

                  <label>Scale</label> 
                  <UnitDropdown onUnitChange={(value) => onScaleChange(input.id, value)} value={input.scale}/>

                  <label>Range</label>
                  <InputRange 
                    scale={input.scale} min={input.min} max={input.max}
                    onMinChange={(value) => onMinChange(input.id, value)} onMaxChange={(value) => onMaxChange(input.id, value)}/>
                  
                  <InputStepsGeneration
                    input={input}
                    onStepGenerationModeChange={onStepGenerationModeChange}
                    onStepIntervalChange={onStepIntervalChange}
                    onNumberOfStepsChange={onNumberOfStepsChange}/>
                </div>
              </div>
          }

          {input && input.stepGenerationMode === 'OPTIONS' && (
            <InputOptionsContainer input={input}/>
          )}
        </div>
        <div className="tricol-left">
          {input && <InputPreview input={input} value={inputValue}/>}      
        </div>      
      </div>
    </div>
  )
}

export default InputForm;