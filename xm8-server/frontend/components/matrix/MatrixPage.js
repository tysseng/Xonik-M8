import PatchTopMenuContainer from '../patch/PatchTopMenuContainer';
import MatrixCenterColumnContainer from './MatrixCenterColumnContainer';
import MatrixLeftMenuContainer from './MatrixLeftMenuContainer';
import VoiceGroupSelectorContainer from '../patch/VoiceGroupSelectorContainer';

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
          <MatrixLeftMenuContainer/>
        </div>
        <div className="rightcolumn">
          Right
        </div>
        <div className="centercolumn">
          <MatrixCenterColumnContainer/>
        </div>
      </div>
      <div className="row">
        <div className="rightcolumn">
          <VoiceGroupSelectorContainer/>
        </div>
      </div>
    </div>
  ) 
}

export default MatrixPage;  
