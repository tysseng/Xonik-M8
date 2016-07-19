import React from 'react';

import ButtonMatrix from './ButtonMatrix';

const MatrixCenterColumn = ({inputs, directoutputs, toggleButton}) => {

  return ( 
    <ButtonMatrix inputs={inputs} directoutputs={directoutputs} toggleButton={toggleButton}/>
  )

}

export default MatrixCenterColumn;