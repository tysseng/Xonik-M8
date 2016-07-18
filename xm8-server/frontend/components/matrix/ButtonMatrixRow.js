import React from 'react';
import _ from 'lodash';

import outputs from '../../../shared/graph/Outputs.js'

const MatrixButtonRow = ({input, toggleButton}) => {

  return ( 
    <tr>
      {Object.values(outputs).map(output => {
        let className = 'matrixbutton';

        if(_.includes(input.directoutputs, output.id)){
          className += ' on';
        }
        return <td key={'col' + input.id+'_'+output.id} ><div className={className} onClick={() => toggleButton(input.id, output.id)}></div></td>
      })}        
    </tr>
  )

}

export default MatrixButtonRow;