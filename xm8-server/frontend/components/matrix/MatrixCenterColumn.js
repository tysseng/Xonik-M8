import React from 'react';

import ButtonMatrix from './ButtonMatrix';
import ButtonMatrixRowLabels from './ButtonMatrixRowLabels';
import ButtonMatrixColLabels from './ButtonMatrixColLabels';

const MatrixCenterColumn = ({inputs, directoutputs, toggleButton, hover}) => {

  return ( 
    <div>
      <ButtonMatrixRowLabels inputs={inputs} directoutputs={directoutputs}/>
      <ButtonMatrixColLabels directoutputs={directoutputs}/>
      <ButtonMatrix inputs={inputs} directoutputs={directoutputs} toggleButton={toggleButton} hover={hover}/>
    </div>
  )

}

export default MatrixCenterColumn;