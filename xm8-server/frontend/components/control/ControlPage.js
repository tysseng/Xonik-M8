import InputGridCenterColumnContainer from '../inputgrid/InputGridCenterColumnContainer';
import InputGridLeftMenuContainer from '../inputgrid/InputGridLeftMenuContainer';

const ControlPage = () => {    
  return (  
    <div id="controlPage">
      <div className="leftcolumn">
        <InputGridLeftMenuContainer/>
      </div>
      <div className="rightcolumn">
        Right
      </div>
      <div className="centercolumn">
        <InputGridCenterColumnContainer/>
      </div>
    </div>
  ) 
}

export default ControlPage;  
