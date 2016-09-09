import MatrixLeftMenu from './MatrixLeftMenu';
import { connect } from 'react-redux';
import { undo, redo, groups as undoGroups } from '../../../shared/state/actions/undo';
import { resetMatrix } from '../../../shared/state/actions/matrix';
import { getGuiPhysicalInputs } from '../../state/selectors';

const mapStateToProps = (state, ownProps) => {
  let selectedInputId = getGuiPhysicalInputs(state).getIn(['frontend', 'selectedInput']);

  return {
    selectedInputId
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    resetMatrix: (inputId) => dispatch(resetMatrix())
  }
}

const MatrixLeftMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatrixLeftMenu);

export default MatrixLeftMenuContainer;