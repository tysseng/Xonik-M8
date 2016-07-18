import React from 'react';
import { connect } from 'react-redux';
import GraphMain from './GraphMain';

// TODO: Don't update if net does not validate (or send error message)

const mapStateToProps = (state, ownProps) => {
  return {
    
  }
}

const GraphMainContainer = connect(
  mapStateToProps,
  null
)(GraphMain);

export default GraphMainContainer;
