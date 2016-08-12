import $ from 'jquery';
import VirtualInputsLeftMenu from './VirtualInputsLeftMenu';
import { connect } from 'react-redux';
import { undo, redo, groups as undoGroups } from '../../../../shared/state/actions/undo';

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onUndo: () => dispatch(undo(undoGroups.PHYSICAL_INPUTS)),
    onRedo: () => dispatch(redo(undoGroups.PHYSICAL_INPUTS)),
  }
}

const VirtualInputsLeftMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VirtualInputsLeftMenu);

export default VirtualInputsLeftMenuContainer;