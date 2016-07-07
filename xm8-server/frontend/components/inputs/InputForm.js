//TODO: Add 'not selected' to midi dropdowns
//TODO: Add 'transmit midi', 'receive midi' checkboxes

import _ from 'lodash';

import MiniIcon from '../framework/MiniIcon';

import inputTypes from '../../../shared/inputs/InputTypes';
import MidiForm from './MidiForm';
import InputOptions from './InputOptions';
import InputPreview from './InputPreview';
import PanelControllerDropdown from './PanelControllerDropdown';
import InputTypesDropdown from './InputTypesDropdown';

import UnitDropdown from '../matrix/ParameterUnitDropdown';

const InputForm = ({ input, inputValue, 
  onCloseDialog, rename, renameShort, 
  onStatusChange, onData1Change, onResolutionChange,
  onSendChange, onReceiveChange,
  onOptionLabelChange, onOptionValueMidiChange, onOptionValueChange,
  onOptionDelete, onOptionNew,
  onSpreadValues, onSpreadValuesMidi,
  onScaleChange, onTypeChange, onControllerChange }) => {

  if(!input){
    return null;
  }

  return (
    <div className='inputForm'>
      <div className='configPane'>
        <div className="heading">Input<MiniIcon label="Close" icon="cancel.svg" onClick={onCloseDialog}/></div>

        <div className='contents'>
          <div>
            <label htmlFor="name">Full name</label>           
            <input id="name" type="text" value={input.name.full} onChange={(e) => rename(input.id, e.target.value)}/>
            <label htmlFor="shortname">Short name</label>           
            <input id="shortname" type="text" value={input.name.short} onChange={(e) => renameShort(input.id, e.target.value)}/>
            <label>Scale</label> 
            <UnitDropdown onUnitChange={(value) => onScaleChange(input.id, value)} value={input.scale}/>
            <label>Display as</label> 
            <InputTypesDropdown onTypeChange={(value) => onTypeChange(input.id, value)} value={input.type}/>
            <label>Panel controller</label> 
            <PanelControllerDropdown value={input.panelController} onControllerChange={(value) => onControllerChange(input.id, value)}/>
            <div>Set interval</div>
            <div>Set number of steps</div>
            <div>Predefined steps</div>

          </div>
        </div>
      </div>
      <MidiForm 
        id='midi'
        midiStatus={input.midi.status} 
        midiData1={input.midi.data1} 
        highRes={input.midi.hires}
        name='Midi' 
        send={input.midi.send}
        receive={input.midi.receive}
        onStatusChange={(value) => onStatusChange(input.id, value)}  
        onData1Change={(value) => onData1Change(input.id, value)}
        onResolutionChange={(value) => onResolutionChange(input.id, value)}
        onSendChange={(value) => onSendChange(input.id, value)}
        onReceiveChange={(value) => onReceiveChange(input.id, value)}/>


      <InputOptions 
        options={input.options} 
        onLabelChange={(index, value) => onOptionLabelChange(input.id, index, value)} 
        onValueMidiChange={(index, value) => onOptionValueMidiChange(input.id, index, value)} 
        onValueChange={(index, value) => onOptionValueChange(input.id, index, value)}
        onDelete={index => onOptionDelete(input.id, index)}
        onNew={() => onOptionNew(input.id)}
        onSpreadValues={() => onSpreadValues(input.id)} 
        onSpreadValuesMidi={() => onSpreadValuesMidi(input.id)}/>

      <InputPreview input={input} value={inputValue}/>
    </div>
  )
}

export default InputForm;