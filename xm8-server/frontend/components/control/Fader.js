import React from 'react';

// http://fribly.com/2015/03/21/pretty-range-input-equalizer-style/
const Fader = ({label, value, orientation = 'vertical', min = 0, max = 128, step = 1, onChange}) => {
  <input type='text' width='5' value={value}/>
  
  return (
    <div className="range" >
      <div className={orientation}>
        <input type='range' min={min} max={max} step={step} value={value} onChange={onChange}/>
      </div>
      <label>{label}</label>

    </div>
  )

}

export default Fader;