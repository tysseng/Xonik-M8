import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';


import NodeLinkList from './NodeLinkList';
import { selectNode, selectLink, deleteNode, deleteLink } from '../../../shared/state/actions';
import paramTypes from '../../../shared/matrix/ParameterTypes.js';

const isLink = (type) => {
  return type === paramTypes.map.LINK.id;
}

// TODO: This should be done higher up in the tree to prevent doing it twice!
const mapStateToProps = (state, ownProps) => {
  //let nodes = state.nodes.toIndexedSeq().toJS();
  let nodes = state.nodes.toJS();

  return {
    links: ownProps.links,  
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