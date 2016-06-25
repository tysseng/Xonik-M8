import React from 'react';
import { connect } from 'react-redux'; 

import FilesCenterColumn from './FilesCenterColumn';

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {  
  }
}


const FilesCenterColumnContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilesCenterColumn);

export default FilesCenterColumnContainer;