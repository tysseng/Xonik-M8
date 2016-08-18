import $ from 'jquery';
import VirtualInputsLeftMenu from './VirtualInputsLeftMenu';
import { connect } from 'react-redux';
import { undo, redo, groups as undoGroups } from '../../../../shared/state/actions/undo';
import { newInput, deleteInput, selectInput } from '../../../../shared/state/actions/inputs';
import { panelControllersById } from "../../../../shared/graph/PanelControllers";
import { getNextId } from '../../../repositories/idRepository';

const mapStateToProps = (state, ownProps) => {
  return {
    selectedInput: state.virtualInputs.getIn(['frontend', 'selectedInput'])
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCreate: () => getNextId(
      (id) => {
        let inputId = 'virt|' + id;
        dispatch(newInput(inputId, panelControllersById.VIRTUAL.id));
        dispatch(selectInput('virtual', inputId));
      }),
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