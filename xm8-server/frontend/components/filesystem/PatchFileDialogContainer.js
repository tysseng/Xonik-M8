// TODO: Move mapping and state functionality to common class together with dispatchers.
// TODO: Warn on load if current state is not saved (or save current state)


// TODO: Autoscroll to make selected file/folder visible
// TODO: Add swipe-scroll to files/folders
// TODO: Add in-field naming ("filename, folder name");
// TODO: Prevent word-wrap in names

// TODO: Reset current file på load hvis man bytter folder.
// TODO: Add new folder-popup.
// TODO: Delete folder-button instead of per-folder delete icon/label

// TODO: Make it impossible to delete undeletable folders (need to find current folder by Id...)

import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import _ from 'lodash';

import { toggleFileDialog, toggleNewFolderDialog, selectFolder, selectFile, setFilename } from '../../../shared/state/actions/filedialog';
import { newFolder, deleteFolder } from '../../../shared/state/actions/filesystem';
import { findFilenameForFileId, findFolderIdForFileId, findPath, getFolderByPathNames, getFilesInFolder } from '../../../shared/filesystem/fileTools';

import FileDialogDispatchers from './dispatchers/FileDialogDispatchers';
import FileDialog from './FileDialog';


const mapStateToProps = (state, ownProps) => {

  let mode = state.filedialog.get('mode');
  //TODO: Remember last directory on reopen - per file type
  let root = getFolderByPathNames(state.filesystem, ownProps.path);

  let selectedFileId = state.filedialog.get('selectedFileId');
  let selectedFilename = state.filedialog.get('filename');  
  let selectedFileVersion = state.filedialog.get('selectedFileVersion');
  
  // If saving, find the currently open file if the user has not explicitly selected a different file or entered a new file name
  if(mode === 'save'){
    if(!selectedFileId) {
      selectedFileId = state.matrix.getIn(['patch','fileId']);

      if(selectedFileId){
        selectedFileVersion = state.matrix.getIn(['patch', 'version']);

        // only load the existing filename if user has not changed the filename in the filename input box.
        if(!selectedFilename) {                  
          let foundFilename = findFilenameForFileId(selectedFileId, selectedFileVersion, root);
          if(foundFilename) selectedFilename == foundFilename;
        }
      } 
    } 
  }

  // Default folder to show is the one explicity selected by the user.
  let selectedFolderId = state.filedialog.get('selectedFolderId');

  // If user has not explicitly navigated to a different folder, show the folder the currently loaded patch is in.
  if(!selectedFolderId && selectedFileId && Number.isInteger(selectedFileVersion)) {
    selectedFolderId = findFolderIdForFileId(selectedFileId, selectedFileVersion, root);
  }

  // Fall back to root if no current file or file not found for some reason.
  if(!selectedFolderId) selectedFolderId = root.get('id');

  // Temporarily disable load button if the selected file is not within the currently selected folder.
  if(mode === 'load' && selectedFileId &&  Number.isInteger(selectedFileVersion)){
    let folderForFile = findFolderIdForFileId(selectedFileId, selectedFileVersion, root);
    if(folderForFile != selectedFolderId){
      selectedFileId = '';
      selectedFilename = '';
      selectedFileVersion = '';
    }
  }


  let files = getFilesInFolder(selectedFolderId, root);  

  return {
    headingPostfix: "patch", 
    mode,
    rootFolder: root.toJS(),
    files: files.toJS(),
    selectedFolderId,
    selectedFileId,
    selectedFileVersion,  
    filename: selectedFilename,
    showNewFolderDialog: state.filedialog.get('showNewFolderDialog')
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    onFolderClick: (id) => {
      dispatch(selectFolder(id));
    },
    onNewFolderOpen: () => {
      console.log("open")
      dispatch(toggleNewFolderDialog(true));
    },    
    onNewFolderSave: (name, selectedFolderId) => {
      console.log("save")
      dispatch(newFolder(name, selectedFolderId));
      dispatch(toggleNewFolderDialog(false));
    },
    onNewFolderClose: (name, selectedFolderId) => {
      console.log("close")
      dispatch(toggleNewFolderDialog(false));
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
    onFileClick: (fileId, version, filename) => {
      dispatch(selectFile(fileId, version, filename));
    },
    onFileSaveClick: (filename, folderId, fileId) => {
      if(!filename){
        console.log("Trying to save a file without a name, aborting");
        return;
      }
      $.ajax({
        url: '/matrix/save',
        type: 'POST',
        contentType:'application/json',
        data: JSON.stringify({name: filename, folderId: folderId, fileId: fileId}),
        dataType:'json',
        success: function(response) {
          console.log("success", response);
          dispatch(toggleFileDialog(false));
        },
        error: function(response) {
          console.log("ERROR saving file");
          console.log(response.responseText);          
        }
      });
    },
    onFileLoadClick: (filename, folderId, fileId, version) => {
      $.ajax({
        url: '/matrix/load',
        type: 'POST',
        contentType:'application/json',
        data: JSON.stringify({fileId, version}),
        dataType:'json',
        success: function(response) {
          dispatch(toggleFileDialog(false));
        },
        error: function(response) {
          console.log("ERROR loading file");
          console.log(response);
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
