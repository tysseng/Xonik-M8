import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import { newFolder, selectFolder, deleteFolder } from '../../../shared/state/actions/filesystem';
import { togglePatchSaveDialog, togglePatchLoadDialog } from '../../../shared/state/actions/nodes';
import { getPatchview, getFilesystem } from '../../state/selectors';
import FolderList from './FolderList';

const mapStateToProps = (state, ownProps) => {
  let fileId = getPatchview(state).getIn(['patch','fileId']);
  let filesystem = getFilesystem(state).toJS();

  return {
    loadedPatchFileId: fileId,
    folders: filesystem.folders,
    selectedFolder: filesystem.selectedFolder
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    onFolderClick: (id) => {
      dispatch(selectFolder(id));
    },
    onNewFolderClick: (name, selectedFolder) => {
      dispatch(newFolder(name, selectedFolder));
    },
    onFolderDeleteClick: (id) => {
      dispatch(deleteFolder(id));      
    },
    onDialogClose: () => {
      dispatch(togglePatchSaveDialog(false));
      dispatch(togglePatchLoadDialog(false));
    },
    onFileSaveClick: (name, id, fileId) => {
      $.ajax({
        url: '/patch/save',
        type: 'PUT',
        contentType:'application/json',
        data: JSON.stringify({name: name, folderId: id, fileId: fileId}),
        dataType:'json',
        success: function(response) {
          console.log(response);
        },
        error: function(response) {
          console.log(response.responseText);
        }
      });
    }
  }
}

const FolderListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FolderList);

export default FolderListContainer;
