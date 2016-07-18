import MatrixCenterColumnContainer from './MatrixCenterColumnContainer';

const MatrixPage = () => {    
  return (  
    <div>
      <div className="leftcolumn">
        Left
      </div>
      <div className="rightcolumn">
        Right
      </div>
      <div className="centercolumn">
        <MatrixCenterColumnContainer/>
      </div>
    </div>
  ) 
}

export default MatrixPage;  
