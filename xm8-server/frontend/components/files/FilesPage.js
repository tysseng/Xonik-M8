import FilesCenterColumnContainer from './FilesCenterColumnContainer';

const FilePage = () => {    
  return (  
    <div>
      <div className="leftcolumn">
        Left
      </div>
      <div className="rightcolumn">
        Right
      </div>
      <div className="centercolumn">
        <FilesCenterColumnContainer/>
      </div>
    </div>
  ) 
}

export default FilePage;  
