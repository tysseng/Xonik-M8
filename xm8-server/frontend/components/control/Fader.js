import React from 'react';

// http://fribly.com/2015/03/21/pretty-range-input-equalizer-style/
const Fader = ({value}) => {
  return (
    <div className="range horizontal">
      <input type='range' min='0' max='32' step='1' value='20'/>
    </div>
  )

}

export default Fader;