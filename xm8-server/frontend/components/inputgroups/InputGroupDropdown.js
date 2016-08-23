import { connect } from 'react-redux';
import Dropdown from '../framework/Dropdown';
import { getVirtualInputGroups } from '../../state/selectors';

const mapStateToProps = (state, ownProps) => {
  let groupsState = getVirtualInputGroups(state).toJS();

  return {
    values: groupsState.groups,
    value: groupsState.selectedGroup
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: value => ownProps.onChange(value)
  }
}

const InputDropdown = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dropdown);

export default InputDropdown;
