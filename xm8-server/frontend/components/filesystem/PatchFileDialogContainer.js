// TODO: Move mapping and state functionality to common class together with dispatchers.
// TODO: Warn on load if current state is not saved (or save current state)

// Figure out how to work with currently selected if folder structure changes, filename changes etc. 
// Remove currentFile details if file is deleted (includes folder deletion)
// Se hva som skjer hvis man sletter en folder som inneholder den filen som er åpen i øyeblikket. Hva skjer med filnavn på save.

import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import _ from 'lodash';

import { toggleFileDialog, selectFolder, selectFile, setFilename } from '../../../shared/state/actions/filedialog';
import { newFolder, deleteFolder } from '../../../shared/state/actions/filesystem';
import { findFilenameForFileId, findFolderIdForFileId, findPath, getFolderByPathNames, getFilesInFolder } from '../../../shared/filesystem/fileTools';

import FileDialogDispatchers from './dispatchers/FileDialogDispatchers';
import FileDialog from './FileDialog';


const mapStateToProps = (state, ownProps) => {

  //TODO: Remember last directory on reopen - per file type
  let root = getFolderByPathNames(state.filesystem, ownProps.path);

  let selectedFileId = state.filedialog.get('selectedFileId');
  let selectedFilename = state.filedialog.get('filename');  
  let selectedFileVersion = state.filedialog.get('selectedFileVersion');
  
  if(!selectedFileId) {
    selectedFileId = state.matrix.getIn(['patch','fileId']);

    if(selectedFileId){
      selectedFileVersion = state.matrix.getIn(['patch', 'version']);

      if(!selectedFilename) {        
        selectedFilename = findFilenameForFileId(selectedFileId, selectedFileVersion, root);
      }
    } 
  } 


  //TODO: BUG: hvis man skal save en eksisterende fil så går man automatisk til der filen er savet.
  // men selectedFolderId settes ikke, så om man klikker på en annen fil så havner man i rotfolderen

  let selectedFolderId = state.filedialog.get('selectedFolderId');
  if(!selectedFolderId && selectedFileId && Number.isInteger(selectedFileVersion)) {
    selectedFolderId = findFolderIdForFileId(selectedFileId, selectedFileVersion, root);
  }
  
  if(!selectedFolderId) selectedFolderId = root.get('id');

  let files = getFilesInFolder(selectedFolderId, root);  

  return {
    mode: state.filedialog.get('mode'),
    rootFolder: root.toJS(),
    files: files.toJS(),
    selectedFolderId,
    selectedFileId,
    selectedFileVersion,  
    filename: selectedFilename
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
          console.log("ERRROR saving file");
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
          console.log("ERRROR loading file");
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
