import InputGridCenterColumnContainer from './InputGridCenterColumnContainer';
import InputGridLeftMenuContainer from './InputGridLeftMenuContainer';
import ElementFormContainer from './ElementFormContainer';

const InputGroupsPage = () => {    
  return (  
    <div id="inputGroupsPage">
      <div className="leftcolumn">
        <InputGridLeftMenuContainer/>
      </div>
      <div className="rightcolumn">
        <ElementFormContainer/>
      </div>
      <div className="centercolumn">
        <InputGridCenterColumnContainer/>
      </div>
    </div>
  ) 
}

export default InputGroupsPage;  
