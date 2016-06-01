//TODO: BUG - if a new name is selected on something that has already been saved, the old file id will be reused and the 
// version bumped and the name replaced in the folder. Even if the name matches an existing name.

// TODO: File ID being sent is wonkey - go through setting and updating fileID.


import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import { toggleFileDialog, selectFolder, selectFile, setFilename } from '../../../shared/state/actions/filedialog';
import { newFolder, deleteFolder } from '../../../shared/state/actions/filesystemActions';
import _ from 'lodash';

import FileDialogDispatchers from './dispatchers/FileDialogDispatchers';
import FileDialog from './FileDialog';

// may be slow. 
const findPath = (id, folder) => {
  let foundSubPath = null;
  let folders = folder.get('folders');

  _.forEach(folders.toArray(), subFolder => {    

    if(subFolder.get('id') === id){
      foundSubPath = ['folders', id];
      return false;
    } 

    let subPath = findPath(id, subFolder);
    if(subPath){
      foundSubPath = ['folders', subFolder.get('id')].concat(subPath);
      return false; 
    }    
  });
  return foundSubPath;
}

const getFiles =(selectedFolder, root) => {
  let pathToFolder = findPath(selectedFolder, root);

  return root.getIn(pathToFolder.concat(['files']));
}

const mapStateToProps = (state, ownProps) => {
  let selectedFileId = state.filedialog.get('selectedFileId');
  if(!selectedFileId) selectedFileId = state.matrix.getIn(['patch','fileId']);

  //TODO: Select correct root node here!
  //TODO: Remember last directory on reopen - per file type
  let selectedFolderId = state.filedialog.get('selectedFolderId');
  let root = state.filesystem;

  return {
    mode: state.filedialog.get('mode'),
    selectedFileId: selectedFileId,
    folders: root.get('folders').toJS(),
    files: selectedFolderId ? getFiles(selectedFolderId, root).toJS(): {},
    selectedFolderId,
    filename: state.filedialog.get('filename')
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    onFolderClick: (id) => {
      dispatch(selectFolder(id));
    },
    onNewFolderClick: (name, selectedFolderId) => {
      dispatch(newFolder(name, selectedFolderId));
    },
    onFolderDeleteClick: (id) => {
      dispatch(deleteFolder(id));      
    },
    onDialogClose: () => {
      dispatch(toggleFileDialog(false));
    },
    onFilenameInputChange: (filename) => {
      dispatch(setFilename(filename));
    },    
    onFileClick: (fileId, filename) => {
      dispatch(selectFile(fileId, filename));
    },
    onFileSaveClick: (filename, folderId, fileId) => {
      if(!filename){
        console.log("Trying to save a file without a name, aborting");
        return;
      }
      $.ajax({
        url: '/matrix/save',
        type: 'PUT',
        contentType:'application/json',
        data: JSON.stringify({name: filename, folderId: folderId, fileId: fileId}),
        dataType:'json',
        success: function(response) {
          console.log("success", response);
          dispatch(toggleFileDialog(false));
        },
        error: function(response) {
          dispatch(toggleFileDialog(false));
        }
      });
    },
    onFileLoadClick: (fileId, version) => {
      $.ajax({
        url: '/matrix/load',
        type: 'GET',
        contentType:'application/json',
        data: JSON.stringify({fileId, version}),
        dataType:'json',
        success: function(response) {
          dispatch(toggleFileDialog(false));
        },
        error: function(response) {
          console.log("ERRROR loading file");
          console.log(response.responseText);
        }
      });      
    }
  }
}

const PatchFileDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FileDialog);

export default PatchFileDialogContainer;
