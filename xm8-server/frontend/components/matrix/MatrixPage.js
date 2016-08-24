import MatrixCenterColumnContainer from './MatrixCenterColumnContainer';
import PatchTopMenuContainer from '../patch/PatchTopMenuContainer';

const MatrixPage = () => {    
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
          Left
        </div>
        <div className="rightcolumn">
          Right
        </div>
        <div className="centercolumn">
          <MatrixCenterColumnContainer/>
        </div>
      </div>
    </div>
  ) 
}

export default MatrixPage;  
