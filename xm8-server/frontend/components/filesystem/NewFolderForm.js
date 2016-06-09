import React from 'react';

const submitForm = (e, onNewFolderSave, selectedFolder) => {
  e.preventDefault();
  let name = e.target.newFolder.value;
  if(name) {
    console.log("submit " + name);
    e.target.newFolder.value = "";
    onNewFolderSave(name, selectedFolder.id);
  }
}

const NewFolderForm = ({selectedFolder, onNewFolderSave, onNewFolderOpen, onNewFolderClose, onFolderDeleteClick, showNewFolderDialog}) => {
  // This may break with the react/redux way of thinking, but I see no need for a 
  // two way binding of the input field here.

  //!selectedFolder.undeletable
  return (
    <div className="new"> 
      <button onClick={onNewFolderOpen}>New folder</button>
      <button disabled={selectedFolder.undeletable} onClick={() => onFolderDeleteClick(selectedFolder.id)}>Delete folder</button>
      {
        showNewFolderDialog &&     
        <div className="newfolderdialog">
          <div>
            <form onSubmit={e =>  submitForm(e, onNewFolderSave, selectedFolder.id)}>
              <div>Name of new folder</div>     
              <input id="newFolder" type="text"/>
              <div>
                <button type="button" onClick={onNewFolderClose}>Cancel</button>
                <button type="submit">Create</button>
              </div>
            </form>
          </div> 
        </div>
      }
    </div>
  )
}

export default NewFolderForm;