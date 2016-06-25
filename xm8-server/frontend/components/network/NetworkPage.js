import NetworkCenterColumnContainer from './NetworkCenterColumnContainer';

const NetworkPage = () => {    
  return (  
    <div>
      <div className="leftcolumn">
        Left
      </div>
      <div className="rightcolumn">
        Right
      </div>
      <div className="centercolumn">
        <NetworkCenterColumnContainer/>
      </div>
    </div>
  ) 
}

export default NetworkPage;  
