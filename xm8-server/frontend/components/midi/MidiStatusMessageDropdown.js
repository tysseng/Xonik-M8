import {channelVoiceMessages} from '../../../shared/midi/MidiStatusMessages';

const MidiStatusMessageDropdown = ({value, onStatusChange}) => {
  return ( 
    <div>
      <label htmlFor='statusMessage'>Status</label>
      <select id='statusMessage' value={value} onChange={onStatusChange}>
        {channelVoiceMessages.map(statusMessage => {
          return <option key={statusMessage.id} value={statusMessage.id}>{statusMessage.name}</option>
        })}
      </select>
    </div>
  )
}

export default MidiStatusMessageDropdown;