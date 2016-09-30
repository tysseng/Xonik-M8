import VirtualInputsLeftMenu from './VirtualInputsLeftMenu';
import { connect } from 'react-redux';
import { newInput, deleteInput } from '../../../../shared/state/actions/inputs';
import { selectInput } from '../../../../shared/state/actions/gui/guiinputs';
import { panelControllersById } from "../../../../shared/graph/PanelControllers";
import { getNextId } from '../../../repositories/idRepository';
import { virtualInputIdPrefix } from '../../../../shared/graph/Inputs';
import { getGuiVirtualInputs } from '../../../state/selectors';

const mapStateToProps = (state, ownProps) => {
  return {
    selectedInput: getGuiVirtualInputs(state).getIn(['frontend', 'selectedInput'])
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCreate: () => getNextId(
      (id) => {
        let inputId = virtualInputIdPrefix + id;
        dispatch(newInput(inputId, panelControllersById.PC_VIRTUAL.id));
        dispatch(selectInput('virtual', inputId));
      }),
    onDelete: (inputId) => dispatch(deleteInput(inputId))
  }
}

const VirtualInputsLeftMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VirtualInputsLeftMenu);

export default VirtualInputsLeftMenuContainer;