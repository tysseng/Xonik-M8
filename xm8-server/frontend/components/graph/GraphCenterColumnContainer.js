import React from 'react';
import { connect } from 'react-redux';
import { getLinks } from './LinkFunctions';


import GraphCenterColumn from './GraphCenterColumn';
import { selectNode, selectLink, createNewNode, createNewLink, deleteNode, deleteLink, toggleAutoUpdate, changeNodeType, graphUndoPointPositionChanged } from '../../../shared/state/actions/nodes';
import { startNodeMove, setLinkFromNodeId, setLinkToNodeId, cancelLinkCreation } from '../../../shared/state/actions/graphvisualization';
import { moveNode } from '../../../shared/state/actions/nodes';
import { toggleMode } from '../../../shared/state/actions/graphgui';

// TODO: Don't update if net does not validate (or send error message)

const mapStateToProps = (state, ownProps) => {
  let nodes = state.nodes.toJS();
  let shouldAutoUpdate = state.graph.get('shouldAutoUpdate');

  return {
    links: getLinks(nodes),
    nodes,
    shouldAutoUpdate,
    mode: state.graph.get('mode'),
    offsetX: state.graph.get('offsetX'),
    offsetY: state.graph.get('offsetY'),
    linkDialog: state.graph.get('linkDialog').toJS(),
    selectedNodeId: state.graph.get('selectedNode'),
    selectedLinkId: state.graph.get('selectedLink'),
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
      dispatch(graphUndoPointPositionChanged());
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


const GraphCenterColumnContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphCenterColumn);

export default GraphCenterColumnContainer;