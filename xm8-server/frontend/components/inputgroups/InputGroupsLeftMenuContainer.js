import $ from 'jquery';
import InputGroupsLeftMenu from './InputGroupsLeftMenu';
import { connect } from 'react-redux';
import { toggleFileDialog } from '../../../shared/state/actions/filedialog';
import { undo, redo, groups as undoGroups } from '../../../shared/state/actions/undo';
import { openNewElementDialog, newGroup } from '../../../shared/state/actions/inputgroups';

// TODO: MOVE THIS!
let nextGroupId = 0;

const mapStateToProps = (state, ownProps) => {
  let inputgroups = state.inputgroups;

  return {
    newElementDialog: inputgroups.get('newElementDialog').toJS()
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onOpenNewElementDialog: () => dispatch(openNewElementDialog()),
    newGroup: () => dispatch(newGroup('' + nextGroupId++)),
    onUndo: () => dispatch(undo(undoGroups.INPUTGROUPS)),
    onRedo: () => dispatch(redo(undoGroups.INPUTGROUPS)),
    onInputGroupsSave: (options) => dispatch(toggleFileDialog(true, 'save', options)),
    onInputGroupsLoad: () => dispatch(toggleFileDialog(true, 'load'))
  }
}

const InputGroupsLeftMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputGroupsLeftMenu);

export default InputGroupsLeftMenuContainer;