import InputGroupsLeftMenu from './InputGroupsLeftMenu';
import { connect } from 'react-redux';
import { undo, redo, groups as undoGroups } from '../../../shared/state/actions/undo';
import { openNewElementDialog, newGroup, selectGroup, deleteGroup } from '../../../shared/state/actions/inputgroups';
import { getNextId } from '../../repositories/idRepository';
import { getVirtualInputGroups } from '../../state/selectors'

const mapStateToProps = (state, ownProps) => {
  let inputgroups = getVirtualInputGroups(state);

  return {
    newElementDialog: inputgroups.get('newElementDialog').toJS(),
    selectedGroup: inputgroups.get('selectedGroup')
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onOpenNewElementDialog: () => dispatch(openNewElementDialog()),
    newGroup: () => getNextId(
      (id) => {
        let groupId = 'virtgroup|' + id;
        dispatch(newGroup(groupId));
        dispatch(selectGroup(groupId));
      }),
    deleteGroup: (groupId) => dispatch(deleteGroup(groupId)),
    onUndo: () => dispatch(undo(undoGroups.INPUTGROUPS)),
    onRedo: () => dispatch(redo(undoGroups.INPUTGROUPS))
  }
}

const InputGroupsLeftMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputGroupsLeftMenu);

export default InputGroupsLeftMenuContainer;