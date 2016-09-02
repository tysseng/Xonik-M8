import MenuItem from '../framework/MenuItem';

const MatrixLeftMenu = ({resetMatrix}) => {
  
  return ( 
    <div>
      <div className="leftMenu">
        <MenuItem label="Reset" icon="garbage.svg" onClick={resetMatrix}/>
      </div>
    </div>
  )
}

export default MatrixLeftMenu;