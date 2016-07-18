import React from 'react';

import ButtonMatrix from './ButtonMatrix';

const MatrixCenterColumn = ({inputs, toggleButton}) => {

  return ( 
    <ButtonMatrix inputs={inputs} toggleButton={toggleButton}/>
  )

}

export default MatrixCenterColumn;