import React from 'react';

const ButtonMatrixRowLabels = ({inputs, directoutputs}) => {

  inputs = _.sortBy(inputs, ['sortKey']);

  return ( 
    <div id='buttonmatrixrows'>
      <div className="corner"></div>
      <table>
        <tbody>
          {Object.values(inputs).map(input => {
            let className = directoutputs.hover.inputId === input.id ? 'hover' : '';
            return <tr key={'labelrow' + input.id}><td><span className={className}>{input.name.full}</span></td></tr>
          })}
        </tbody>
      </table>           
    </div>
  )

}

export default ButtonMatrixRowLabels;