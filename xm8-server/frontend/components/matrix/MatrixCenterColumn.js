import React from 'react';

import TableTest from './TableTest';
import ButtonMatrix from './ButtonMatrix';
import ButtonMatrixRowLabels from './ButtonMatrixRowLabels';
import ButtonMatrixColLabels from './ButtonMatrixColLabels';

const MatrixCenterColumn = ({inputs, hover, directoutputs, graphOutputs, toggleButton, onHover}) => {

  // TODO: TableTest is too slow for some reason.

  return ( 
    <div className="matrix">
      <TableTest inputs={inputs} directoutputs={directoutputs} graphOutputs={graphOutputs} toggleButton={toggleButton} hover={hover} onHover={onHover}/>
      <ButtonMatrixRowLabels inputs={inputs} hover={hover}/>
      <ButtonMatrixColLabels hover={hover}/>
      <ButtonMatrix inputs={inputs} directoutputs={directoutputs} toggleButton={toggleButton} onHover={onHover}/>
    </div>
  )

}

export default MatrixCenterColumn;