import TrashCenterColumnContainer from './TrashCenterColumnContainer';

const TrashPage = () => {    
  return (  
    <div>
      <div className="leftcolumn">
        Left
      </div>
      <div className="rightcolumn">
        Right
      </div>
      <div className="centercolumn">
        <TrashCenterColumnContainer/>
      </div>
    </div>
  ) 
}

export default TrashPage;  
