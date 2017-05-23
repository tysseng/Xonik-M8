import React from 'react';
import _ from 'lodash';

const ButtonMatrixRowLabels = ({inputs, hover}) => {

  inputs = _.sortBy(inputs, ['sortKey']);

  return (
    <div id='buttonmatrixrows'>
      <div className="corner"></div>
      <table>
        <tbody>
          {Object.values(inputs).map(input => {
            let className = hover.inputId === input.id ? 'hover' : '';
            return <tr key={'labelrow' + input.id}><td><span className={className}>{input.name.full}</span></td></tr>
          })}
        </tbody>
      </table>
    </div>
  )

}

export default ButtonMatrixRowLabels;