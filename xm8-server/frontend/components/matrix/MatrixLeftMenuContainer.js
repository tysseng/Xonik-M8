import MatrixLeftMenu from './MatrixLeftMenu';
import { connect } from 'react-redux';
import { toggleFileDialog } from '../../../shared/state/actions/filedialog';
import { createNewNode, deleteNode, deleteLink } from '../../../shared/state/actions';

const mapStateToProps = (state, ownProps) => {
  let selectedFileDetails = {
    selectedFileId: state.matrix.getIn(['patch','fileId']),
    selectedFileVersion: state.matrix.getIn(['patch', 'version']),
  }

  return {
    selectedFileDetails,
    selectedNodeId: state.matrix.get('selectedNode'),
    selectedLinkId: state.matrix.get('selectedLink'),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onPatchSave: (options) => dispatch(toggleFileDialog(true, 'save', options)),
    onPatchSaveAs: (options) => dispatch(toggleFileDialog(true, 'saveas', options)),
    onPatchLoad: () => dispatch(toggleFileDialog(true, 'load')),
    onDelete: (nodeId, linkId) => {
      if(nodeId){
        dispatch(deleteNode(nodeId));
      } else if(linkId){
        dispatch(deleteLink(nodeId));
      }
    },
    onCreate: () => {
      console.log("Create!")
      dispatch(createNewNode())
    }
  }
}

const MatrixLeftMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatrixLeftMenu);

export default MatrixLeftMenuContainer;