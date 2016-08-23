import ControlCenterColumnContainer from './ControlCenterColumnContainer';
import ControlLeftMenuContainer from './ControlLeftMenuContainer';
const ControlPage = () => {    
  return (  
    <div id="controlPage">
      <div className="leftcolumn">
        <ControlLeftMenuContainer/>
      </div>
      <div className="rightcolumn">
        Right
      </div>
      <div className="centercolumn">
        <ControlCenterColumnContainer/>
      </div>
    </div>
  ) 
}

export default ControlPage;  
