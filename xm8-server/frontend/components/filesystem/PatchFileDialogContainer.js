//TODO: BUG - if a new name is selected on something that has already been saved, the old file id will be reused and the 
// version bumped and the name replaced in the folder. Even if the name matches an existing name.

// TODO: Remove usage of fileId, use name everywhere.
// Figure out how to work with currently selected if folder structure changes, filename changes etc. 
// Remove currentFile details if file is deleted (includes folder deletion)
// find folderId from filename when opening dialog. (if not found, open root. See what happens if saving existing file in new folder.)
// Se hva som skjer hvis man sletter en folder som inneholder den filen som er åpen i øyeblikket. Hva skjer med filnavn på save.
// Finn ut om det er et problem å ikke bruke filversjon i et søk i filtreet. Kan en fil med samme id ligge med ulik versjon i ulike folder?
// Slå sammen fileId og version til et objekt
// Set filnavn første gang man åpner hvis selected file finnes (bare på save as, save skal ikke åpne dialog hvis file finnes)

import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import _ from 'lodash';

import { toggleFileDialog, selectFolder, selectFile, setFilename } from '../../../shared/state/actions/filedialog';
import { newFolder, deleteFolder } from '../../../shared/state/actions/filesystem';
import { findFolderIdForFileId, findPath, getFolderByPathNames, getFilesInFolder } from '../../../shared/filesystem/fileTools';

import FileDialogDispatchers from './dispatchers/FileDialogDispatchers';
import FileDialog from './FileDialog';


const mapStateToProps = (state, ownProps) => {
  let selectedFileId = state.filedialog.get('selectedFileId');
  if(!selectedFileId) selectedFileId = state.matrix.getIn(['patch','fileId']);

  //TODO: Remember last directory on reopen - per file type
  let root = getFolderByPathNames(state.filesystem, ownProps.path);
  

  let selectedFolderId = state.filedialog.get('selectedFolderId');
  if(!selectedFolderId && selectedFileId) {
    let selectedVersion = state.matrix.getIn(['patch','fileId']);
    selectedFolderId = findFolderIdForFileId(selectedFileId, selectedVersion, root);
  }
  
  if(!selectedFolderId) selectedFolderId = root.get('id');

  console.log("Selected file id: " + selectedFileId);
  console.log("Selected folder id: " + selectedFolderId);

  return {
    mode: state.filedialog.get('mode'),
    selectedFileId: selectedFileId,
    rootFolder: root.toJS(),
    files: selectedFolderId ? getFilesInFolder(selectedFolderId, root).toJS(): {},
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
      console.log("Creating in " + selectedFolderId)
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
          console.log("ERRROR saving file");
          console.log(response.responseText);          
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
