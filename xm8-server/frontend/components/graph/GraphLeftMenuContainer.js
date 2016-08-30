import $ from 'jquery';
import GraphLeftMenu from './GraphLeftMenu';
import { connect } from 'react-redux';
import { createNewNode, deleteNode, deleteLink, resetGraph} from '../../../shared/state/actions/nodes';
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
    selectedFileId: state.patchview.getIn(['patch','fileId']),
    selectedFileVersion: state.patchview.getIn(['patch', 'version']),
  }

  return {
    selectedFileDetails,
    mode: state.patchview.get('mode'),
    selectedNodeId: state.patchview.get('selectedNode'),
    selectedLinkId: state.patchview.get('selectedLink'),
    shouldAutoUpdate: state.patchview.get('shouldAutoUpdate')
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onUpdateVoice: forceUpdate,
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