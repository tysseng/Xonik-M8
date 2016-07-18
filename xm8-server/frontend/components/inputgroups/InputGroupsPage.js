import InputGroupsCenterColumnContainer from './InputGroupsCenterColumnContainer';
import InputGroupsLeftMenuContainer from './InputGroupsLeftMenuContainer';
import ElementFormContainer from './ElementFormContainer';

const InputGroupsPage = () => {    
  return (  
    <div id="inputGroupsPage">
      <div className="leftcolumn">
        <InputGroupsLeftMenuContainer/>
      </div>
      <div className="rightcolumn">
        <ElementFormContainer/>
      </div>
      <div className="centercolumn">
        <InputGroupsCenterColumnContainer/>
      </div>
    </div>
  ) 
}

export default InputGroupsPage;  
