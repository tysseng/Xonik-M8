import React from 'react';
import { connect } from 'react-redux';
import { getLinks } from './LinkFunctions';


import NodeLinkList from './NodeLinkList';
import { selectNode, selectLink, deleteNode, deleteLink } from '../../../shared/state/actions';

const mapStateToProps = (state, ownProps) => {
  let nodes = state.nodes.toJS();

  return {
    links: getLinks(nodes),
    nodes,
    selectedNodeId: state.matrix.get('selectedNode'),
    selectedLinkId: state.matrix.get('selectedLink')
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onNodeClick: (id) => dispatch(selectNode(id)),
    onLinkClick: (id) => dispatch(selectLink(id)),
    onNodeDeleteClick: (id) => dispatch(deleteNode(id)),
    onLinkDeleteClick: (id, from, to, param) => dispatch(deleteLink(id, from, to, param))
  }
}


const NodeLinkListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NodeLinkList);

export default NodeLinkListContainer;