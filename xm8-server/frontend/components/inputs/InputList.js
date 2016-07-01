import React from 'react';
import InputListElement from './InputListElement';

const InputList = ({inputs, onInputClick}) => {
  return (
    <div className="inputList">    
      {inputs.map(input => <InputListElement key={input.id} input={input} onInputClick={onInputClick}/>)}
    </div>
  )
}

export default InputList;