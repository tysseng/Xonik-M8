import InputGridCenterColumnContainer from '../inputgrid/InputGridCenterColumnContainer';
import InputGridLeftMenuContainer from '../inputgrid/InputGridLeftMenuContainer';
import ElementFormContainer from '../inputgrid/ElementFormContainer';

const ControlPage = () => {    
  return (  
    <div id="controlPage">
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

export default ControlPage;  
