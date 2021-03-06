import React from 'react';
import _ from 'lodash';

import outputs from '../../../shared/graph/Outputs.js'

const ButtonMatrixRow = ({input, directoutputs, toggleButton, onHover}) => {

  return ( 
    <tr>
      {Object.values(outputs).map(output => {
        let className = 'matrixbutton';

        if(directoutputs[output.id] === input.id){
          className += ' on';
        }
        return <td key={'col' + input.id+'_'+output.id} >
          <div className={className} 
            onClick={() => toggleButton(input.id, output.id)} 
            onMouseOver={() => onHover(input.id, output.id)} 
            onMouseOut={() => onHover('','')}></div>
          </td>
      })}        
    </tr>
  )

}

export default ButtonMatrixRow;