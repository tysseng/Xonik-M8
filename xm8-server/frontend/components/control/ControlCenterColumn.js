import React from 'react';
import Fader from './Fader';

const ControlCenterColumn = () => {

  return ( 
    <div>
      <div>Controls</div>
      <div className="faderRow">
        <div className="faderGroup">
          <Fader value={0} label='Attack'/>
          <Fader value={10} label='Decay'/>
          <Fader value={32} label='Sustain'/>        
          <Fader value={20} label='Release'/>
        </div>
        <div className="faderGroup">
          <Fader value={0} label='Attack'/>
          <Fader value={10} label='Decay'/>
          <Fader value={32} label='Sustain'/>        
          <Fader value={20} label='Release'/>
        </div>
      </div>
      <div className="faderRow">  
        <div className="faderGroup">
          <Fader value={0} label='Attack'/>
          <Fader value={10} label='Decay'/>
          <Fader value={32} label='Sustain'/>        
          <Fader value={20} label='Release'/>
        </div>
        <div className="faderGroup">
          <Fader value={0} label='Attack'/>
          <Fader value={10} label='Decay'/>
          <Fader value={32} label='Sustain'/>        
          <Fader value={20} label='Release'/>
        </div>
      </div>
    </div>
  )

}

export default ControlCenterColumn;