import React from 'react'
import GraphLeftMenuContainer from './GraphLeftMenuContainer';
import GraphRightColumn from './GraphRightColumn';
import GraphCenterColumnContainer from './GraphCenterColumnContainer';

const GraphMain = () => {    
  return (  
    <div>
      <div className="leftcolumn">
        <GraphLeftMenuContainer/>
      </div>
      <div className="rightcolumn">
        <GraphRightColumn/>        
      </div>
      <div className="centercolumn">
        <GraphCenterColumnContainer/>
      </div>
    </div>
  ) 
}

export default GraphMain;  
