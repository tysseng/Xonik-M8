import React from 'react';
import { connect } from 'react-redux';

import { selectLink, changeLinkName } from '../../../shared/state/actions';
import paramTypes from '../../../shared/matrix/ParameterTypes.js';
import LinkForm from './LinkForm'

const isLink = (type) => {
  return type === paramTypes.map.LINK.id;
}

const mapStateToProps = (state, ownProps) => {
  let nodes = state.nodes.toJS();
  let links = {};
  _.each(nodes, node => {
    _.each(node.params, param => {
      if(isLink(param.type) && param.value && param.value !== ""){
        links[param.value.id] = param.value;
      }
    });
  });

  let selecedLinkId = state.matrix.get('selectedLink');
  let link = links[selecedLinkId];
  
  return {
    link,
    nodes
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLinkNameChange: (toNodeId, toParamId, name) => {
      dispatch(changeLinkName(toNodeId, toParamId, name));
    },
    onCloseDialog: () => dispatch(selectLink(''))
  }
}

const LinkFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkForm);

export default LinkFormContainer;
