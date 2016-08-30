import MenuItem from '../framework/MenuItem';

const MatrixLeftMenu = ({onUndo, onRedo, resetMatrix}) => {
  
  return ( 
    <div>
      <div className="leftMenu">
        <MenuItem label="Undo" icon="circular-arrow-1.svg" onClick={onUndo}/>
        <MenuItem label="Redo" icon="circular-arrow.svg" onClick={onRedo}/>
      </div>
      <div className="leftMenu">
        <MenuItem label="Reset" icon="garbage.svg" onClick={resetMatrix}/>
      </div>
    </div>
  )
}

export default MatrixLeftMenu;