import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import { newFolder, selectFolder, deleteFolder } from '../../../shared/state/actions/filesystemActions';

import FolderList from './FolderList'

const mapStateToProps = (state, ownProps) => {
  let fileId = state.matrix.getIn(['patch','fileId']);
  let filesystem = state.filesystem.toJS();

  return {
    loadedPatchFileId: fileId,
    folders: filesystem.folders,
    selectedFolder: filesystem.selectedFolder
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onFolderClick: (id) => {
      console.log("clicked folder " + id);
      dispatch(selectFolder(id));
    },
    onNewFolderClick: (name, selectedFolder) => {
      console.log("clicked new folder ");
      dispatch(newFolder(name, selectedFolder));
    },
    onFolderDeleteClick: (id) => {
      dispatch(deleteFolder(id));      
    },
    onFileSaveClick: (name, id, fileId) => {
      $.ajax({
        url: '/matrix/save',
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
