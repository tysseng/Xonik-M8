import ControlCenterColumnContainer from './ControlCenterColumnContainer';

const ControlPage = () => {    
  return (  
    <div id="controlPage">
      <div className="leftcolumn">
        Left
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
