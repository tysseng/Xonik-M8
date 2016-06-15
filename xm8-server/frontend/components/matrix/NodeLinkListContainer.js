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
  let nodes = state.nodes.toIndexedSeq().toJS();
  let nodes2 = state.nodes.toJS();

  let links = [];
  _.each(nodes, node => {
    _.each(node.params, param => {
      if(isLink(param.type) && param.value && param.value !== ""){   

        param.value.vis = {
          from: nodes2[param.value.from].vis,
          to: node.vis
        }

        links.push(param.value);
      }
    });
  });

  return {
    links,
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