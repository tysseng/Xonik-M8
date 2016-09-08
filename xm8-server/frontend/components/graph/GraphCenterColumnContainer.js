import React from 'react';
import { connect } from 'react-redux';
import { getLinks } from './LinkFunctions';


import GraphCenterColumn from './GraphCenterColumn';
import { selectNode, selectLink, createNewLink, toggleAutoUpdate, changeNodeType, graphUndoPointPositionChanged } from '../../../shared/state/actions/nodes';
import { startNodeMove, setLinkFromNodeId, setLinkToNodeId, cancelLinkCreation } from '../../../shared/state/actions/graphvisualization';
import { moveNode } from '../../../shared/state/actions/nodes';
import { toggleMode } from '../../../shared/state/actions/graphgui';
import { getNodes, getPatchview, getGuiPatchview } from '../../state/selectors';

// TODO: Don't update if net does not validate (or send error message)

const mapStateToProps = (state, ownProps) => {
  let nodes = getNodes(state).toJS();
  let patchview = getPatchview(state);
  let guipatchview = getGuiPatchview(state);
  let shouldAutoUpdate = patchview.get('shouldAutoUpdate');

  return {
    links: getLinks(nodes),
    nodes,
    shouldAutoUpdate,
    mode: guipatchview.get('mode'),
    offsetX: guipatchview.get('offsetX'),
    offsetY: guipatchview.get('offsetY'),
    linkDialog: guipatchview.get('linkDialog').toJS(),
    selectedNodeId: guipatchview.get('selectedNode'),
    selectedLinkId: guipatchview.get('selectedLink')
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
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