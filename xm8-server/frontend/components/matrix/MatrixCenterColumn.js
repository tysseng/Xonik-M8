import React from 'react';

import TableTest from './TableTest';
import ButtonMatrix from './ButtonMatrix';
import ButtonMatrixRowLabels from './ButtonMatrixRowLabels';
import ButtonMatrixColLabels from './ButtonMatrixColLabels';

const MatrixCenterColumn = ({inputs, directoutputs, toggleButton, hover}) => {

  return ( 
    <div className="matrix">
      <TableTest inputs={inputs} directoutputs={directoutputs} toggleButton={toggleButton} hover={hover}/>
      <ButtonMatrixRowLabels inputs={inputs} directoutputs={directoutputs}/>
      <ButtonMatrixColLabels directoutputs={directoutputs}/>
      <ButtonMatrix inputs={inputs} directoutputs={directoutputs} toggleButton={toggleButton} hover={hover}/>
    </div>
  )

}

export default MatrixCenterColumn;