import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import $ from 'jquery';

import MatrixCenterColumn from './MatrixCenterColumn';
import { selectNode, selectLink, createNewNode, deleteNode, deleteLink, toggleAutoUpdate } from '../../../shared/state/actions';
import { moveNode } from '../../../shared/state/actions/matrixvisualization';
import paramTypes from '../../../shared/matrix/ParameterTypes.js';

// TODO: Don't update if net does not validate (or send error message)

// TODO: BUG ved klikk på noder, gir dispatch feil.

const forceUpdate = () => {
  $.ajax({
    url: '/matrix/publish',
    type: 'PUT',
    success: function(response) {
      console.log(response);
    },
    error: function(response) {
      console.log(response.responseText);
    }
  });
}

const isLink = (type) => {
  return type === paramTypes.map.LINK.id;
}

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


  let shouldAutoUpdate = state.matrix.get('shouldAutoUpdate');

  return {
    links,
    nodes,
    shouldAutoUpdate,
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
    onForceUpdate: forceUpdate,
    onNodeMove: (nodeId, x, y) => dispatch(moveNode(nodeId, x, y))
  }
}


const MatrixCenterColumnContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatrixCenterColumn);

export default MatrixCenterColumnContainer;