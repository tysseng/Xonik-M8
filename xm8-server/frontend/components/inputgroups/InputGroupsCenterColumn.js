import React from 'react';

import ElementSelectorDialog from './ElementSelectorDialog';
import InputGridContainer from './InputGridContainer';
import InputGroupDropdown from './InputGroupDropdown';
import FileDialogContainer from '../filesystem/FileDialogContainer';

const InputGroupsCenterColumn = ({
  showFileDialog, selectedGroupId, groupName, isVisible, newElementDialog,
  closeNewElementDialog, addElement, selectElement, selectGroup, renameGroup, toggleVisibility}) => {
  return ( 
    <div>
      {showFileDialog && <FileDialogContainer path='/inputgroups' headingPostfix='input groups' saveUrl='/api/inputgroup/save' loadUrl = '/api/inputgroup/load'/> } 
      {newElementDialog.show && 
        <ElementSelectorDialog 
          newElementDialog={newElementDialog} 
          selectedGroupId={selectedGroupId}
          onCancel={closeNewElementDialog} 
          onAdd={addElement} 
          selectElement={selectElement}/> 
      }
      <InputGroupDropdown onChange={selectGroup}/>
      {selectedGroupId &&
      <div>

        <div>
          <label>Name</label>
          <input type="text" value={groupName} onChange={e => renameGroup(selectedGroupId, e.target.value)}/>
        </div>
        <div>
          <label>
            Hide from controls
            <input type="checkbox" checked={isVisible} onChange={e => toggleVisibility(selectedGroupId, e.target.checked)}/>
          </label>
        </div>
        <InputGridContainer/>
      </div>
      }
        
    </div>
  )

}

export default InputGroupsCenterColumn;