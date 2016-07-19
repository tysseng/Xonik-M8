import React from 'react';

import ButtonMatrix from './ButtonMatrix';
import ButtonMatrixRowLabels from './ButtonMatrixRowLabels';
import ButtonMatrixColLabels from './ButtonMatrixColLabels';

const MatrixCenterColumn = ({inputs, directoutputs, toggleButton}) => {

  return ( 
    <div>
      <ButtonMatrixRowLabels inputs={inputs} directoutputs={directoutputs}/>
      <ButtonMatrixColLabels/>
      <ButtonMatrix inputs={inputs} directoutputs={directoutputs} toggleButton={toggleButton}/>
    </div>
  )

}

export default MatrixCenterColumn;