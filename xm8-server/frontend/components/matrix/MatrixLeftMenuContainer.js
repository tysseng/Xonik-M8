import $ from 'jquery';
import MatrixLeftMenu from './MatrixLeftMenu';
import { connect } from 'react-redux';
import { toggleFileDialog } from '../../../shared/state/actions/filedialog';
import { createNewNode, deleteNode, deleteLink, matrixUndo, matrixRedo } from '../../../shared/state/actions';
import { toggleMode } from '../../../shared/state/actions/matrixgui';

const forceUpdate = () => {
  $.ajax({
    url: '/matrix/publish',
    type: 'PUT',
    success: function(response) {
      console.log(response);
    },
    error: function(response) {
      console.log(response.responseText);
    }
  });
}

const mapStateToProps = (state, ownProps) => {
  let selectedFileDetails = {
    selectedFileId: state.matrix.getIn(['patch','fileId']),
    selectedFileVersion: state.matrix.getIn(['patch', 'version']),
  }

  return {
    selectedFileDetails,
    mode: state.matrix.get('mode'),
    selectedNodeId: state.matrix.get('selectedNode'),
    selectedLinkId: state.matrix.get('selectedLink'),
    shouldAutoUpdate: state.matrix.get('shouldAutoUpdate')
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onPatchSave: (options) => dispatch(toggleFileDialog(true, 'save', options)),
    onPatchSaveAs: (options) => dispatch(toggleFileDialog(true, 'saveas', options)),
    onPatchLoad: () => dispatch(toggleFileDialog(true, 'load')),
    onUpdateVoice: forceUpdate,
    onDelete: (nodeId, linkId) => {
      if(nodeId){
        dispatch(deleteNode(nodeId));
      } else if(linkId){
        dispatch(deleteLink(nodeId));
      }
    },
    onCreate: () => dispatch(createNewNode()),
    onModeChange: (mode) => dispatch(toggleMode(mode)),
    onUndo: () => dispatch(matrixUndo()),
    onRedo: () => dispatch(matrixRedo())
  }
}

const MatrixLeftMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatrixLeftMenu);

export default MatrixLeftMenuContainer;