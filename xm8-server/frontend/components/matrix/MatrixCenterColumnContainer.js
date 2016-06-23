import React from 'react';
import { connect } from 'react-redux';
import { getLinks } from './LinkFunctions';


import MatrixCenterColumn from './MatrixCenterColumn';
import { selectNode, selectLink, createNewNode, createNewLink, deleteNode, deleteLink, toggleAutoUpdate, changeNodeType, matrixUndoPointPositionChanged } from '../../../shared/state/actions';
import { startNodeMove, moveNode, setLinkFromNodeId, setLinkToNodeId, cancelLinkCreation } from '../../../shared/state/actions/matrixvisualization';
import { toggleMode } from '../../../shared/state/actions/matrixgui';

// TODO: Don't update if net does not validate (or send error message)

const mapStateToProps = (state, ownProps) => {
  let nodes = state.nodes.toJS();
  let shouldAutoUpdate = state.matrix.get('shouldAutoUpdate');

  return {
    links: getLinks(nodes),
    nodes,
    shouldAutoUpdate,
    mode: state.matrix.get('mode'),
    offsetX: state.matrix.get('offsetX'),
    offsetY: state.matrix.get('offsetY'),
    linkDialog: state.matrix.get('linkDialog').toJS(),
    selectedNodeId: state.matrix.get('selectedNode'),
    selectedLinkId: state.matrix.get('selectedLink'),
    showFileDialog: state.filedialog.get('show')
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCreateNewNode: () => dispatch(createNewNode()),    
    onNodeClick: (id, offsetX, offsetY) => {
      dispatch(selectNode(id));
      dispatch(toggleMode('move_node'));
      dispatch(startNodeMove(offsetX, offsetY));
    },
    onNodeMoveEnded: () => {
      dispatch(toggleMode('default'));
      dispatch(matrixUndoPointPositionChanged());
    },
    onLinkClick: (id) => dispatch(selectLink(id)),
    onNodeDeleteClick: (id) => dispatch(deleteNode(id)),
    onLinkDeleteClick: (id, from, to, param) => dispatch(deleteLink(id, from, to, param)),
    toggleAutoUpdate: (shouldAutoUpdate) => dispatch(toggleAutoUpdate(shouldAutoUpdate)),
    onNodeMove: (nodeId, x, y) => dispatch(moveNode(nodeId, x, y)),
    setLinkFromNode: (nodeId) => dispatch(setLinkFromNodeId(nodeId)),
    setLinkToNode: (nodeId) => dispatch(setLinkToNodeId(nodeId)),
    cancelLinkCreation: (nodeId) => dispatch(cancelLinkCreation(nodeId)),
    createLink: (fromId, toId, propertyId) => dispatch(createNewLink(fromId, toId, propertyId)),
    onNodeTypeChange: (nodeId, typeId) => dispatch(changeNodeType(nodeId, typeId))    
  }
}


const MatrixCenterColumnContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatrixCenterColumn);

export default MatrixCenterColumnContainer;