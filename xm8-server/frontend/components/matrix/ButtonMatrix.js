import React from 'react';

import outputs from '../../../shared/graph/Outputs'
import ButtonMatrixRow from './ButtonMatrixRow';

const ButtonMatrix = ({inputs, directoutputs, toggleButton, hover}) => {

  inputs = _.sortBy(inputs, ['sortKey']);

  return (
    <div id='buttonmatrix'>
      <table>
        <tbody>
          {Object.values(inputs).map(input => {
            return <ButtonMatrixRow key={'row' + input.id} input={input} directoutputs={directoutputs} toggleButton={toggleButton} hover={hover}/>
          })}
        </tbody>
      </table>           
    </div>
  )

}

export default ButtonMatrix;