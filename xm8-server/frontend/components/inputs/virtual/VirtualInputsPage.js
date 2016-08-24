import VirtualInputFormContainer from './VirtualInputFormContainer';
import VirtualInputsLeftMenuContainer from './VirtualInputsLeftMenuContainer';
import PatchTopMenuContainer from '../../patch/PatchTopMenuContainer';

const VirtualInputsPage = () => {    
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
          <VirtualInputsLeftMenuContainer/>
        </div>
        <div className="centercolumn">
          <VirtualInputFormContainer/>
        </div>
      </div>
    </div>
  ) 
}

export default VirtualInputsPage;  
