import $ from 'jquery';
import PatchTopMenu from './PatchTopMenu';
import { connect } from 'react-redux';
import { toggleFileDialog } from '../../../shared/state/actions/filedialog';
import { createNewNode, deleteNode, deleteLink} from '../../../shared/state/actions/nodes';
import { undo, redo, groups as undoGroups } from '../../../shared/state/actions/undo';
import { toggleMode } from '../../../shared/state/actions/graphgui';
import { resetPatch } from '../../../shared/state/actions/patch';
import { getFileDialog, getPatchView } from '../../state/selectors';

const forceUpdate = () => {
  $.ajax({
    url: '/api/graph/publish',
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

  let patchview = getPatchView(state);

  let selectedFileDetails = {
    selectedFileId: patchview.getIn(['patch','fileId']),
    selectedFileVersion: patchview.getIn(['patch', 'version']),
  }

  return {
    selectedFileDetails,
    mode: patchview.get('mode'),
    selectedNodeId: patchview.get('selectedNode'),
    selectedLinkId: patchview.get('selectedLink'),
    shouldAutoUpdate: patchview.get('shouldAutoUpdate'),
    showFileDialog: getFileDialog(state).get('show')
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onPatchSave: (options) => dispatch(toggleFileDialog(true, 'save', options)),
    onPatchSaveAs: (options) => dispatch(toggleFileDialog(true, 'saveas', options)),
    onPatchLoad: () => dispatch(toggleFileDialog(true, 'load')),
    resetPatch: () => dispatch(resetPatch()),
    onUpdateVoice: forceUpdate,
    onDelete: (nodeId, linkId) => {
      if(nodeId){
        dispatch(deleteNode(nodeId));
      } else if(linkId){
        // TODO: create action that can delete a link without knowing more than the id 
        dispatch(deleteLink(linkId));
      }
    },
    onCreate: () => dispatch(createNewNode()),
    onModeChange: (mode) => dispatch(toggleMode(mode)),
    onUndo: () => dispatch(undo(undoGroups.GRAPH)),
    onRedo: () => dispatch(redo(undoGroups.GRAPH))
  }
}

const PatchTopMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PatchTopMenu);

export default PatchTopMenuContainer;