import $ from 'jquery';
import GraphLeftMenu from './GraphLeftMenu';
import { connect } from 'react-redux';
import { toggleFileDialog } from '../../../shared/state/actions/filedialog';
import { createNewNode, deleteNode, deleteLink} from '../../../shared/state/actions/nodes';
import { undo, redo, groups as undoGroups } from '../../../shared/state/actions/undo';
import { toggleMode } from '../../../shared/state/actions/graphgui';

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
  let selectedFileDetails = {
    selectedFileId: state.graph.getIn(['patch','fileId']),
    selectedFileVersion: state.graph.getIn(['patch', 'version']),
  }

  return {
    selectedFileDetails,
    mode: state.graph.get('mode'),
    selectedNodeId: state.graph.get('selectedNode'),
    selectedLinkId: state.graph.get('selectedLink'),
    shouldAutoUpdate: state.graph.get('shouldAutoUpdate')
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
    onUndo: () => dispatch(undo(undoGroups.GRAPH)),
    onRedo: () => dispatch(redo(undoGroups.GRAPH))
  }
}

const GraphLeftMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphLeftMenu);

export default GraphLeftMenuContainer;