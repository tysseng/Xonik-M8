import ControlLeftMenu from './ControlLeftMenu';
import { connect } from 'react-redux';
import { selectControllerGroup } from '../../../shared/state/actions/gui/guicontrollers';
import { getGroups, getSelectedGroupId } from './groupTools';
import {getInputsAsJS} from "../../state/selectors";


const mapStateToProps = (state, ownProps) => {
  let groups = getGroups(state);
  let inputs = getInputsAsJS(state);
  let selectedGroupId = getSelectedGroupId(state, inputs);

  return {
    groups,
    selectedGroupId,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    selectGroup: groupId => dispatch(selectControllerGroup(groupId))
  }
}

const ControlLeftMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlLeftMenu);

export default ControlLeftMenuContainer;