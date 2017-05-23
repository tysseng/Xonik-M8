import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { selectLink, changeLinkName, toggleLinkNameInGraph } from '../../../../shared/state/actions/nodes';
import { paramTypesById } from '../../../../shared/graph/ParameterTypes';
import LinkForm from './LinkForm'
import { getNodes, getGuiPatchview } from '../../../state/selectors';

const isLink = (type) => {
  return type === paramTypesById.LINK.id;
}

const mapStateToProps = (state, ownProps) => {
  let nodes = getNodes(state).toJS();
  let links = {};
  _.each(nodes, node => {
    _.each(node.params, param => {
      if(isLink(param.type) && param.value && param.value !== ""){
        links[param.value.id] = param.value;
      }
    });
  });

  let selecedLinkId = getGuiPatchview(state).get('selectedLink');
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
    onCloseDialog: () => dispatch(selectLink('')),
    toggleLinkNameInGraph: (toNodeId, toParamId, visible) => {
      dispatch(toggleLinkNameInGraph(toNodeId, toParamId, visible));
    }
  }
}

const LinkFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkForm);

export default LinkFormContainer;
