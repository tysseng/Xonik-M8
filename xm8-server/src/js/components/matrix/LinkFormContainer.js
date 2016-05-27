import React from 'react';
import { connect } from 'react-redux';

import { changeLinkName } from '../../../../shared/state/actions';
import paramTypes from '../../../../shared/matrix/ParameterTypes.js';
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

  let link = links[ownProps.linkId];
  
  return {
    link
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLinkNameChange: (toNodeId, toParamId, name) => {
      dispatch(changeLinkName(toNodeId, toParamId, name));
    }
  }
}

const LinkFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkForm);

export default LinkFormContainer;
