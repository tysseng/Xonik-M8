import React from 'react';
import outputs from '../../../shared/graph/Outputs.js'

const ButtonMatrixColLabels = () => {

  return ( 
    <div id='buttonmatrixcols'>
      <table>
        <tbody>
          <tr>
            {Object.values(outputs).map(output => {
              return <td key={'col' + output.id}><div>{output.name}</div></td>;
            })}
          </tr>
        </tbody>
      </table>    
    </div>
  )

}

export default ButtonMatrixColLabels;