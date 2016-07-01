import React from 'react';

// http://fribly.com/2015/03/21/pretty-range-input-equalizer-style/
const InputListElement = ({input, onInputClick}) => {
  return (
    <div className="inputDescription button" onClick={() => onInputClick(input.id)}>{input.name.full}</div>
  )
}

export default InputListElement;