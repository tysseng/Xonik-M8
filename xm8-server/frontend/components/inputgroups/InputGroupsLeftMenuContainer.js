import InputGroupsLeftMenu from './InputGroupsLeftMenu';
import { connect } from 'react-redux';
import { openNewElementDialog, newGroup, selectGroup, deleteGroup } from '../../../shared/state/actions/inputgroups';
import { getNextId } from '../../repositories/idRepository';
import { getVirtualInputGroups } from '../../state/selectors';
import { virtualInputGroupIdPrefix } from '../../../shared/graph/Inputs';

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
        let groupId = virtualInputGroupIdPrefix + id;
        dispatch(newGroup(groupId));
        dispatch(selectGroup(groupId));
      }),
    deleteGroup: (groupId) => dispatch(deleteGroup(groupId))
  }
}

const InputGroupsLeftMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputGroupsLeftMenu);

export default InputGroupsLeftMenuContainer;