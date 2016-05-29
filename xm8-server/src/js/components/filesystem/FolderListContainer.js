import React from 'react';
import { connect } from 'react-redux';

import { newFolder, selectFolder, deleteFolder } from '../../../../shared/state/actions/filesystemActions';

import FolderList from './FolderList'

const mapStateToProps = (state, ownProps) => {
  let filesystem = state.filesystem.toJS();

  return {
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
    }
  }
}

const FolderListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FolderList);

export default FolderListContainer;
