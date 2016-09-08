import InputGroupsLeftMenu from './InputGroupsLeftMenu';
import { connect } from 'react-redux';
import { openNewElementDialog, newGroup, selectGroup, deleteGroup, deleteElement } from '../../../shared/state/actions/inputgroups';
import { getNextId } from '../../repositories/idRepository';
import { getGuiVirtualInputGroups } from '../../state/selectors';
import { virtualInputGroupIdPrefix } from '../../../shared/graph/Inputs';

const mapStateToProps = (state, ownProps) => {
  let inputgroups = getGuiVirtualInputGroups(state);

  return {
    newElementDialog: inputgroups.get('newElementDialog').toJS(),
    selectedGroupId: inputgroups.get('selectedGroup'),
    selectedElementId: inputgroups.get('selectedElementId')
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onOpenNewElementDialog: () => dispatch(openNewElementDialog()),
    newGroup: () => getNextId(
      (id) => {
        let groupId = virtualInputGroupIdPrefix + id;
        dispatch(newGroup(groupId));
        dispatch(selectGroup(groupId));
      }),
    deleteGroup: (groupId) => dispatch(deleteGroup(groupId)),
    deleteElement: (elementId, groupId) => dispatch(deleteElement(elementId, groupId))
  }
}

const InputGroupsLeftMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputGroupsLeftMenu);

export default InputGroupsLeftMenuContainer;