import $ from 'jquery';
import GraphLeftMenu from './GraphLeftMenu';
import { connect } from 'react-redux';
import { createNewNode, deleteNode, deleteLink, resetGraph} from '../../../shared/state/actions/nodes';
import { toggleMode } from '../../../shared/state/actions/graphgui';
import { getPatchView } from '../../state/selectors';

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
    shouldAutoUpdate: patchview.get('shouldAutoUpdate')
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