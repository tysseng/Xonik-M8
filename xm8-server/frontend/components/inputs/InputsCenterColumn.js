import React from 'react';
import InputList from './InputList';

const InputsCenterColumn = ({groups, inputs, selectInput}) => {

  return ( 
    <div>
      <InputList inputs={inputs} onInputClick={selectInput}/>
    </div>
  )
}

export default InputsCenterColumn;