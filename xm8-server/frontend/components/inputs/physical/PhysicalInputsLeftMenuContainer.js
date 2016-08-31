import PhysicalInputsLeftMenu from './PhysicalInputsLeftMenu';
import { connect } from 'react-redux';
import { undo, redo, groups as undoGroups } from '../../../../shared/state/actions/undo';
import { resetPhysicalInput, resetPhysicalInputs } from '../../../../shared/state/actions/inputs';
import { getPhysicalInputs } from '../../../state/selectors';

const mapStateToProps = (state, ownProps) => {
  let selectedInputId = getPhysicalInputs(state).getIn(['frontend', 'selectedInput']);

  return {
    selectedInputId
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onUndo: () => dispatch(undo(undoGroups.PHYSICAL_INPUTS)),
    onRedo: () => dispatch(redo(undoGroups.PHYSICAL_INPUTS)),
    resetCurrentPhysicalInput: (inputId) => dispatch(resetPhysicalInput(inputId)),
    resetPhysicalInputs: () => dispatch(resetPhysicalInputs()),
  }
}

const PhysicalInputsLeftMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhysicalInputsLeftMenu);

export default PhysicalInputsLeftMenuContainer;