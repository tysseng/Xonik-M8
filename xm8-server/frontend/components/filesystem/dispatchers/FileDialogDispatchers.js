class FileDialogDispatchers { 

  constructor(dispatch){
    this.dispatch = dispatch;
  }

  onFolderClick(id) {
    dispatch(selectFolder(id));
  }

  onNewFolderClick(name, selectedFolder) {
    dispatch(newFolder(name, selectedFolder));
  }

  onFolderDeleteClick (id) {
    dispatch(deleteFolder(id));      
  }

  onDialogClose () {
    dispatch(togglePatchSaveDialog(false));
    dispatch(togglePatchLoadDialog(false));
  }
  
  onFileSaveClick () {
    console.log("File saving not implemented, override onFileSaveClick in mapDispatchToProps");
  }
};

export default FileDialogDispatchers;