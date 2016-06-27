import React from 'react';
import Fader from './Fader';

const ControlCenterColumn = () => {

  return ( 
    <div>
      <div>Controls</div>
      <div className="faderPane">
        <Fader value={50}/>
        <Fader value={50}/>
        <Fader value={50}/>
        <Fader value={50}/>
        <Fader value={50}/>
      </div>
    </div>
  )

}

export default ControlCenterColumn;