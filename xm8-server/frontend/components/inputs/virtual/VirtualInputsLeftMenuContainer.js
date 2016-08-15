import $ from 'jquery';
import VirtualInputsLeftMenu from './VirtualInputsLeftMenu';
import { connect } from 'react-redux';
import { undo, redo, groups as undoGroups } from '../../../../shared/state/actions/undo';
import { newInput, deleteInput } from '../../../../shared/state/actions/inputs';
import { panelControllersById } from "../../../../shared/graph/PanelControllers";

const mapStateToProps = (state, ownProps) => {
  return {
    selectedInput: state.inputs.getIn(['frontend', 'virtual', 'selectedInput'])
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCreate: () => dispatch(newInput(panelControllersById.VIRTUAL.id)),
    onDelete: (inputId) => dispatch(deleteInput(inputId)),
    onUndo: () => dispatch(undo(undoGroups.VIRTUAL_INPUTS)),
    onRedo: () => dispatch(redo(undoGroups.VIRTUAL_INPUTS)),
  }
}

const VirtualInputsLeftMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VirtualInputsLeftMenu);

export default VirtualInputsLeftMenuContainer;