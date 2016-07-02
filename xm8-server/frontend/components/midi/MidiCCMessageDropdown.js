import controllerMessages from '../../../shared/midi/MidiControllers';
import {controllersById} from '../../../shared/midi/MidiControllers';

const MidiCCMessageDropdown = ({value, highRes, onCCChange, onResolutionChange}) => {

  let controller = controllersById[value];
  let showHiRes = (controller ? controller.hiRes : false);
  console.log('hr', highRes)
  return ( 
    <div>
      <label htmlFor='ccMessage'>Controller</label>
      <select id='ccMessage' value={value} onChange={onCCChange}>
        {controllerMessages.map(ccMessage => {
          return <option key={ccMessage.id} value={ccMessage.id}>{ccMessage.name}</option>
        })}
      </select>
      {showHiRes && 
        <span><input id='hiRes' type='checkbox' checked={highRes} onChange={onResolutionChange}/><label htmlFor='hiRes'>High resolution</label></span>
      }
    </div>
  )
}

export default MidiCCMessageDropdown;