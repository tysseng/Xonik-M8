import React from 'react';
import { connect } from 'react-redux';
import { getNetwork } from '../../state/selectors';

import NetworkCenterColumn from './NetworkCenterColumn';

const mapStateToProps = (state, ownProps) => {

  let netState = getNetwork(state);
  console.log(netState);
  return {
    currentNetwork: netState.get('current').toJS(), 
    builtInNetwork: netState.get('builtIn').toJS(), 
    knownNetworks: netState.get('known').toJS(), 
    availableNetworks: netState.get('available').toJS()
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {  
  }
}


const NetworkCenterColumnContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NetworkCenterColumn);

export default NetworkCenterColumnContainer;