import React from 'react';

import ElementSelectorDialog from './ElementSelectorDialog';
import InputGridContainer from './InputGridContainer';
import FileDialogContainer from '../filesystem/FileDialogContainer';

const InputGridCenterColumn = ({showFileDialog, selectedGroupId, newElementDialog, closeNewElementDialog, addElement, selectElement}) => {
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

      <InputGridContainer/>
        
    </div>
  )

}

export default InputGridCenterColumn;