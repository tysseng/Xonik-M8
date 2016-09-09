import VirtualInputsLeftMenu from './VirtualInputsLeftMenu';
import { connect } from 'react-redux';
import { newInput, deleteInput, selectInput } from '../../../../shared/state/actions/inputs';
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
        dispatch(newInput(inputId, panelControllersById.VIRTUAL.id));
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