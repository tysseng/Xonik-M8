import InputGroupsCenterColumnContainer from './InputGroupsCenterColumnContainer';
import InputGroupsLeftMenuContainer from './InputGroupsLeftMenuContainer';
import ElementFormContainer from './ElementFormContainer';
import GroupPropsFormContainer from './GroupPropsFormContainer';
import PatchTopMenuContainer from '../patch/PatchTopMenuContainer';

const InputGroupsPage = () => {    
  return (  
    <div id="inputGroupsPage">
      <div className="row">
        <div className="topcorner"></div>
        <div className="topsubmenu">
          <PatchTopMenuContainer/>
        </div>
      </div>
      <div className="row">
        <div className="leftcolumn">
          <InputGroupsLeftMenuContainer/>
        </div>
        <div className="rightcolumn">
          <GroupPropsFormContainer/>
          <ElementFormContainer/>
        </div>
        <div className="centercolumn">
          <InputGroupsCenterColumnContainer/>
        </div>
      </div>
    </div>
  ) 
}

export default InputGroupsPage;  
