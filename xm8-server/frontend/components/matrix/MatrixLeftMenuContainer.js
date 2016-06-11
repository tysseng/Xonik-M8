import MatrixLeftMenu from './MatrixLeftMenu';
import { connect } from 'react-redux';
import { toggleFileDialog } from '../../../shared/state/actions/filedialog';

const mapStateToProps = (state, ownProps) => {
  let selectedFileDetails = {
    selectedFileId: state.matrix.getIn(['patch','fileId']),
    selectedFileVersion: state.matrix.getIn(['patch', 'version']),
  }

  return {
    selectedFileDetails
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onPatchSave: (options) => dispatch(toggleFileDialog(true, 'save', options)),
    onPatchSaveAs: (options) => dispatch(toggleFileDialog(true, 'saveas', options)),
    onPatchLoad: () => dispatch(toggleFileDialog(true, 'load'))
  }
}

const MatrixLeftMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatrixLeftMenu);

export default MatrixLeftMenuContainer;