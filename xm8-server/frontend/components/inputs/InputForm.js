import _ from 'lodash';

import MiniIcon from '../framework/MiniIcon';

import inputTypes from '../../../shared/inputs/InputTypes';
import MidiForm from './MidiForm';
import InputOptions from './InputOptions';

const InputForm = ({ input, onCloseDialog, rename, renameShort, 
  onTransmitStatusChange, onTransmitData1Change, onTransmitResolutionChange,
  onReceiveStatusChange, onReceiveData1Change, onReceiveResolutionChange}) => {

  if(!input){
    return null;
  }

  return (

    <form className="inputForm configPane">
      <div className="heading">Input<MiniIcon label="Close" icon="cancel.svg" onClick={onCloseDialog}/></div>

      <div className='contents'>
        <div>
          <label htmlFor="name">Full name</label>           
          <input id="name" type="text" value={input.name.full} onChange={(e) => rename(input.id, e.target.value)}/>
          <label htmlFor="shortname">Short name</label>           
          <input id="shortname" type="text" value={input.name.short} onChange={(e) => renameShort(input.id, e.target.value)}/>
        </div>
        <div>
          <MidiForm 
            id='midi_transmit'
            midiStatus={input.midi.transmit.status} 
            midiData1={input.midi.transmit.data1} 
            highRes={input.midi.transmit.hires}
            name='Midi transmit' 
            onStatusChange={(value) => onTransmitStatusChange(input.id, value)}  
            onData1Change={(value) => onTransmitData1Change(input.id, value)}
            onResolutionChange={(value) => onTransmitResolutionChange(input.id, value)}/>

          <MidiForm 
            id='midi_receive'
            midiStatus={input.midi.receive.status} 
            midiData1={input.midi.receive.data1} 
            highRes={input.midi.receive.hires}
            name='Midi receive' 
            onStatusChange={(value) => onReceiveStatusChange(input.id, value)}  
            onData1Change={(value) => onReceiveData1Change(input.id, value)}
            onResolutionChange={(value) => onReceiveResolutionChange(input.id, value)}/>
        </div>
        <InputOptions options={input.options}/>
      </div>    
    </form>
  )
}

export default InputForm;