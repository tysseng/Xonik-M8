import React from 'react';
import { connect } from 'react-redux'; 

import SettingsCenterColumn from './SettingsCenterColumn';

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {  
  }
}


const SettingsCenterColumnContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsCenterColumn);

export default SettingsCenterColumnContainer;