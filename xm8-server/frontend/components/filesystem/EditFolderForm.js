import React from 'react';
import ModalBox from '../framework/ModalBox';

const submitForm = (e, onNewFolderSave, selectedFolder) => {
  e.preventDefault();
  let name = e.target.newFolder.value;
  if(name) {
    e.target.newFolder.value = "";
    onNewFolderSave(name, selectedFolder.id);
  }
}

const EditFolderForm = ({selectedFolder, onNewFolderSave, onNewFolderOpen, onNewFolderClose, onFolderDeleteClick, showNewFolderDialog}) => {
  // This may break with the react/redux way of thinking, but I see no need for a 
  // two way binding of the input field here.

  return (
    <div className="new"> 
      <div>
        Folder
      </div>
      <button onClick={onNewFolderOpen}>New</button>
      <button disabled={selectedFolder.undeletable} onClick={() => onFolderDeleteClick(selectedFolder.id)}>Delete</button>
      {
        showNewFolderDialog && 
        <ModalBox heading='Create new folder' boxClass='newfolderdialog'>    
          <form onSubmit={e =>  submitForm(e, onNewFolderSave, selectedFolder)}>
            <div>Name</div>     
            <input id="newFolder" type="text"/>
            <div>
              <button type="button" onClick={onNewFolderClose}>Cancel</button>
              <button type="submit">Create</button>
            </div>
          </form>
        </ModalBox>
      }
    </div>
  )
}

export default EditFolderForm;