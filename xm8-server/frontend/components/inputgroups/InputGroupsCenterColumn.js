import React from 'react';

import ElementSelectorDialog from './ElementSelectorDialog';
import InputGridContainer from './InputGridContainer';
import InputGroupDropdown from './InputGroupDropdown';
import FileDialogContainer from '../filesystem/FileDialogContainer';

const InputGroupsCenterColumn = ({
  showFileDialog, selectedGroupId, newElementDialog,
  closeNewElementDialog, addElement, selectElement, selectGroup}) => {
  return ( 
    <div className="inputgroups">
      {showFileDialog && <FileDialogContainer path='/inputgroups' headingPostfix='input groups' saveUrl='/api/inputgroup/save' loadUrl = '/api/inputgroup/load'/> } 
      {newElementDialog.show && 
        <ElementSelectorDialog 
          newElementDialog={newElementDialog} 
          selectedGroupId={selectedGroupId}
          onCancel={closeNewElementDialog} 
          onAdd={addElement} 
          selectElement={selectElement}/> 
      }
      <div className="properties">
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