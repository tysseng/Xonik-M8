import HomeCenterColumnContainer from './HomeCenterColumnContainer';

const HomePage = () => {    
  return (  
    <div>
      <div className="leftcolumn">
        Left
      </div>
      <div className="rightcolumn">
        Right
      </div>
      <div className="centercolumn">
        <HomeCenterColumnContainer/>
      </div>
    </div>
  ) 
}

export default HomePage;  
