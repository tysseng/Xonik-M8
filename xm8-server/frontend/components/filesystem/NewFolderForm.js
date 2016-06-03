import React from 'react';

const submitForm = (e, onNewFolderClick, selectedFolder) => {
  e.preventDefault();
  let name = e.target.newFolder.value;
  if(name) {
    console.log("submit " + name);
    e.target.newFolder.value = "";
    onNewFolderClick(name, selectedFolder);
  }
}

const NewFolderForm = ({selectedFolderId, onNewFolderClick}) => {
  // This may break with the react/redux way of thinking, but I see no need for a 
  // two way binding of the input field here.
  return (
    <div>      
      <form onSubmit={e =>  submitForm(e, onNewFolderClick, selectedFolderId)}>
        <label htmlFor="newFolder">New folder</label>     
        <input id="newFolder" type="text"/>
        <button type="submit">Create</button>
      </form> 
    </div>
  )
}

export default NewFolderForm;