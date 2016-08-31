import MatrixLeftMenu from './MatrixLeftMenu';
import { connect } from 'react-redux';
import { undo, redo, groups as undoGroups } from '../../../shared/state/actions/undo';
import { resetMatrix } from '../../../shared/state/actions/matrix';
import { getPhysicalInputs } from '../../state/selectors';

const mapStateToProps = (state, ownProps) => {
  let selectedInputId = getPhysicalInputs(state).getIn(['frontend', 'selectedInput']);

  return {
    selectedInputId
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onUndo: () => dispatch(undo(undoGroups.MATRIX)),
    onRedo: () => dispatch(redo(undoGroups.MATRIX)),
    resetMatrix: (inputId) => dispatch(resetMatrix()),
  }
}

const MatrixLeftMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatrixLeftMenu);

export default MatrixLeftMenuContainer;