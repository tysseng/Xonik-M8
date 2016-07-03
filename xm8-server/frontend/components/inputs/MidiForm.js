import React from 'react'
import MidiCCMessageDropdown from '../midi/MidiCCMessageDropdown';
import MidiStatusMessageDropdown from '../midi/MidiStatusMessageDropdown';

const MidiForm = ({
  id,
  midiStatus,
  midiData1,
  highRes,
  name,
  onStatusChange,
  onData1Change,
  onResolutionChange
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
      body = <input type="text" value={midiData1} onChange={(e) => onData1Change(e.target.value)}/>;
      break;
  }

  return (
    <span>
      <label>{name}</label>
      <div>
        <MidiStatusMessageDropdown value={midiStatus} onStatusChange={(e) => onStatusChange(e.target.value)}/> {body}
      </div>
    </span>
  )
}

export default MidiForm;