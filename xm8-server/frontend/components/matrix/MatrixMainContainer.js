import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import paramTypes from '../../../shared/matrix/ParameterTypes.js';

import MatrixMain from './MatrixMain';

// TODO: Don't update if net does not validate (or send error message)

const isLink = (type) => {
  return type === paramTypes.map.LINK.id;
}
  

const mapStateToProps = (state, ownProps) => {
  let nodes = state.nodes.toJS();

  let links = [];
  _.each(nodes, node => {
    _.each(node.params, param => {
      if(isLink(param.type) && param.value && param.value !== ""){   

        param.value.vis = {
          from: nodes[param.value.from].vis,
          to: node.vis
        }

        links.push(param.value);
      }
    });
  });

  return {
    links
  }
}

const MatrixMainContainer = connect(
  mapStateToProps,
  null
)(MatrixMain);

export default MatrixMainContainer;
