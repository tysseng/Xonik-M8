import React from 'react';
import outputs from '../../../shared/graph/Outputs.js'

const ButtonMatrixColLabels = ({directoutputs}) => {

  return ( 
    <div id='buttonmatrixcols'>
      <table>
        <tbody>
          <tr>
            {Object.values(outputs).map(output => {
              let className = directoutputs.hover.outputId === output.id ? 'hover' : '';

              return <td key={'col' + output.id}><div className={className}>{output.name}</div></td>;
            })}
          </tr>
        </tbody>
      </table>    
    </div>
  )

}

export default ButtonMatrixColLabels;