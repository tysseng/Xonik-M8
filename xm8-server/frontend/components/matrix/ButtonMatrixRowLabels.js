import React from 'react';

const ButtonMatrixRowLabels = ({inputs, directoutputs}) => {

  inputs = _.sortBy(inputs, ['sortKey']);

  return ( 
    <div id='buttonmatrixrows'>
      <div className="corner"></div>
      <table>
        <tbody>
          {Object.values(inputs).map(input => {
            return <tr key={'labelrow' + input.id}><td>{input.name.full}</td></tr>
          })}
        </tbody>
      </table>           
    </div>
  )

}

export default ButtonMatrixRowLabels;