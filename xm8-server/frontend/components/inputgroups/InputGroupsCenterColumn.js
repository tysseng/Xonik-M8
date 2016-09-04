import React from 'react';

import ElementSelectorDialog from './ElementSelectorDialog';
import InputGridContainer from './InputGridContainer';
import InputGroupDropdown from './InputGroupDropdown';

const InputGroupsCenterColumn = ({
  selectedGroupId, newElementDialog,
  closeNewElementDialog, addElement, selectElement, selectGroup}) => {
  return ( 
    <div className="inputgroups">
      {newElementDialog.show && 
        <ElementSelectorDialog 
          newElementDialog={newElementDialog} 
          selectedGroupId={selectedGroupId}
          onCancel={closeNewElementDialog} 
          onAdd={addElement} 
          selectElement={selectElement}/> 
      }
      <div className="actions">
        <div className="dropdown">
          <label>Group</label>
          <InputGroupDropdown onChange={selectGroup}/>
        </div>
      </div>
      <div>
        {selectedGroupId && <InputGridContainer/>}
      </div>
    </div>
  )

}

export default InputGroupsCenterColumn;