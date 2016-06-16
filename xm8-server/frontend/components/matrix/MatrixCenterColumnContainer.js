import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';


import MatrixCenterColumn from './MatrixCenterColumn';
import { selectNode, selectLink, createNewNode, deleteNode, deleteLink, toggleAutoUpdate } from '../../../shared/state/actions';
import { moveNode, setLinkFromNodeId, setLinkToNodeId } from '../../../shared/state/actions/matrixvisualization';

// TODO: Don't update if net does not validate (or send error message)



const mapStateToProps = (state, ownProps) => {
  let nodes = state.nodes.toIndexedSeq().toJS();
  let shouldAutoUpdate = state.matrix.get('shouldAutoUpdate');

  return {
    links: ownProps.links,
    nodes,
    shouldAutoUpdate,
    mode: state.matrix.get('mode'),
    linkFromNodeId: state.matrix.get('linkFromNodeId'),
    linkToNodeId: state.matrix.get('linkToNodeId'),
    selectedNodeId: state.matrix.get('selectedNode'),
    selectedLinkId: state.matrix.get('selectedLink'),
    showFileDialog: state.filedialog.get('show')
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCreateNewNode: () => dispatch(createNewNode()),    
    onNodeClick: (id) => dispatch(selectNode(id)),
    onLinkClick: (id) => dispatch(selectLink(id)),
    onNodeDeleteClick: (id) => dispatch(deleteNode(id)),
    onLinkDeleteClick: (id, from, to, param) => dispatch(deleteLink(id, from, to, param)),
    toggleAutoUpdate: (shouldAutoUpdate) => dispatch(toggleAutoUpdate(shouldAutoUpdate)),
    onNodeMove: (nodeId, x, y) => dispatch(moveNode(nodeId, x, y)),
    setLinkFromNode: (nodeId) => dispatch(setLinkFromNodeId(nodeId)),
    setLinkToNode: (nodeId) => dispatch(setLinkToNodeId(nodeId)),
    cancelLinkCreation: (nodeId) => dispatch(cancelLinkCreation(nodeId))
  }
}


const MatrixCenterColumnContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatrixCenterColumn);

export default MatrixCenterColumnContainer;