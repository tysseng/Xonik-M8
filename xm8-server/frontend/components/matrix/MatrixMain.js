import React from 'react'
import MatrixLeftMenuContainer from './MatrixLeftMenuContainer';
import MatrixRightColumn from './MatrixRightColumn';
import MatrixCenterColumnContainer from './MatrixCenterColumnContainer';

const MatrixMain = ({links}) => {    
  return (  
    <div>
      <div className="leftcolumn">
        <MatrixLeftMenuContainer/>
      </div>
      <div className="rightcolumn">
        <MatrixRightColumn links={links}/>        
      </div>
      <div className="centercolumn">
        <MatrixCenterColumnContainer links={links}/>
      </div>
    </div>
  ) 
}

export default MatrixMain;  
