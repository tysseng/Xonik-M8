import React from 'react'

import NodeFormContainer from './NodeFormContainer';
import LinkFormContainer from './LinkFormContainer';
import NodeLinkListContainer from './NodeLinkListContainer';

const MatrixRightColumn = ({links}) => {    
  return (  
    <div>
      <NodeFormContainer/>    
      <LinkFormContainer/>
      <NodeLinkListContainer links={links}/>
    </div>    
  )
}

export default MatrixRightColumn;