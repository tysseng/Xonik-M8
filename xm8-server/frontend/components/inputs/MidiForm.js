import React from 'react'
import MidiCCMessageDropdown from '../midi/MidiCCMessageDropdown';
import MidiStatusMessageDropdown from '../midi/MidiStatusMessageDropdown';

const MidiForm = ({
  id,
  midiStatus,
  midiData1,
  highRes,
  name,
  send,
  receive,
  onStatusChange,
  onData1Change,
  onResolutionChange,
  onSendChange,
  onReceiveChange
}) => {
  let body;

  switch(midiStatus){
    case 0xB0: //CC
      body = <MidiCCMessageDropdown 
                id={id + '_cc'}
                value={midiData1} 
                highRes={highRes} 
                onCCChange={onData1Change} 
                onResolutionChange={onResolutionChange}/>;
      break;
    default:
      body = <span><label>Data byte 1</label><input type="text" value={midiData1} onChange={(e) => onData1Change(e.target.value)}/></span>;
      break;
  }

  return (
    <div className='configPane'>        
      <div className="heading">Midi</div>
      <div className='contents'>    
        <div>
          <MidiStatusMessageDropdown value={midiStatus} onStatusChange={(e) => onStatusChange(e.target.value)}/> {body}
          <div><input id={id + '_send'} type='checkbox' checked={send} onChange={(e) => onSendChange(e.target.checked)}/><label htmlFor={id + '_send'}>Send midi</label></div>
          <div><input id={id + '_receive'} type='checkbox' checked={receive} onChange={(e) => onReceiveChange(e.target.checked)}/><label htmlFor={id + '_receive'}>Receive midi</label></div>
        </div>
      </div>
    </div>        
  )
}

export default MidiForm;