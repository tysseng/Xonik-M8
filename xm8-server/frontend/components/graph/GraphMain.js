import React from 'react'
import GraphLeftMenuContainer from './GraphLeftMenuContainer';
import GraphRightColumn from './GraphRightColumn';
import GraphCenterColumnContainer from './GraphCenterColumnContainer';
import PatchTopMenuContainer from '../patch/PatchTopMenuContainer';

const GraphMain = () => {    
  return (
    <div>
      <div className="row">
        <div className="topcorner"></div>
        <div className="topsubmenu">
          <PatchTopMenuContainer/>
        </div>
      </div>
      <div className="row">
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
    </div>
  ) 
}

export default GraphMain;  
