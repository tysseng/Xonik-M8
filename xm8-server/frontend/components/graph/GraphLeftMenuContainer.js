import $ from 'jquery';
import GraphLeftMenu from './GraphLeftMenu';
import { connect } from 'react-redux';
import { createNewNode, deleteNode, deleteLink, resetGraph} from '../../../shared/state/actions/nodes';
import { toggleMode } from '../../../shared/state/actions/graphgui';
import { getPatchview, getGuiPatchview, getGuiPatchviews } from '../../state/selectors';

const forceUpdate = (patchNumber) => {
  $.ajax({
    url: '/api/patch/publish',
    type: 'PUT',
    contentType:'application/json',
    dataType:'json',
    data: JSON.stringify({patchNumber}),
    success: function(response) {
      console.log(response);
    },
    error: function(response) {
      console.log(response.responseText);
    }
  });
}

const mapStateToProps = (state, ownProps) => {
  let guipatchview = getGuiPatchview(state);
  let patchview = getPatchview(state);
  let guipatchviewsRoot = getGuiPatchviews(state);

  let selectedFileDetails = {
    selectedFileId: patchview.getIn(['patch','fileId']),
    selectedFileVersion: patchview.getIn(['patch', 'version']),
  }

  return {
    selectedFileDetails,
    mode: guipatchview.get('mode'),
    selectedPatchNumber: guipatchviewsRoot.get('selectedPatchNumber'),
    selectedNodeId: guipatchview.get('selectedNode'),
    selectedLinkId: guipatchview.get('selectedLink'),
    shouldAutoUpdate: guipatchview.get('shouldAutoUpdate')
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onUpdateVoice: selectedPatchNumber => forceUpdate(selectedPatchNumber),
    onDelete: (nodeId, linkId) => {
      if(nodeId){
        dispatch(deleteNode(nodeId));
      } else if(linkId){
        dispatch(deleteLink(linkId));
      }
    },
    onCreate: () => dispatch(createNewNode()),
    onModeChange: (mode) => dispatch(toggleMode(mode)),
    resetGraph: () => dispatch(resetGraph())
  }
}

const GraphLeftMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphLeftMenu);

export default GraphLeftMenuContainer;