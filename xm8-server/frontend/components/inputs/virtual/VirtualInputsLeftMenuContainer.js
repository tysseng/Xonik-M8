import $ from 'jquery';
import VirtualInputsLeftMenu from './VirtualInputsLeftMenu';
import { connect } from 'react-redux';
import { undo, redo, groups as undoGroups } from '../../../../shared/state/actions/undo';
import { newInput, deleteInput, selectInput } from '../../../../shared/state/actions/inputs';
import { panelControllersById } from "../../../../shared/graph/PanelControllers";

const mapStateToProps = (state, ownProps) => {
  return {
    selectedInput: state.virtualInputs.getIn(['frontend', 'selectedInput'])
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCreate: () => {
      // Id is generated here to be able to autoselect it afterwards. 
      // We should idealy use ids that do not require a server call and are unique
      // across synths and memory cards.
      $.ajax({
        url: '/api/id/next',
        type: 'GET',
        contentType:'application/json',
        success: function(response) {
          let inputId = 'virt|' + response;
          dispatch(newInput(inputId, panelControllersById.VIRTUAL.id));
          dispatch(selectInput('virtual', inputId));
        },
        error: function(response) {
          console.log("Failed to retrieve a new id for the input");
        }
      });            
    },
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