import $ from 'jquery';
import InputsLeftMenu from './InputsLeftMenu';
import { connect } from 'react-redux';
import { toggleFileDialog } from '../../../shared/state/actions/filedialog';
import { undo, redo, groups as undoGroups } from '../../../shared/state/actions/undo';
import { openNewElementDialog, newGroup } from '../../../shared/state/actions/inputgrid';

// TODO: MOVE THIS!
let nextInputId = 0;

const mapStateToProps = (state, ownProps) => {
  let inputs = state.inputs;

  return {
    selectedInputId: inputs.get('selectedInput')
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onOpenNewElementDialog: () => dispatch(openNewElementDialog()),
    onNewInput: () => dispatch(onNewInput('' + nextInputId++)),
    onDelete: (inputId) => dispatch(deleteInput(inputId)),
    onUndo: () => dispatch(undo(undoGroups.INPUTS)),
    onRedo: () => dispatch(redo(undoGroups.INPUTS)),
    onInputsSave: (options) => dispatch(toggleFileDialog(true, 'save', options)),
    onInputsLoad: () => dispatch(toggleFileDialog(true, 'load'))
  }
}

const InputsLeftMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputsLeftMenu);

export default InputsLeftMenuContainer;