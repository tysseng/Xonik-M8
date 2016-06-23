import React from 'react'

import NodeFormContainer from './NodeFormContainer';
import LinkFormContainer from './LinkFormContainer';
import NodeLinkListContainer from './NodeLinkListContainer';

const MatrixRightColumn = () => {    
  return (  
    <div>
      <NodeFormContainer/>    
      <LinkFormContainer/>
      <NodeLinkListContainer/>
    </div>    
  )
}

export default MatrixRightColumn;