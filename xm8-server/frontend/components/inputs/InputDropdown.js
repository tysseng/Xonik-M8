import { connect } from 'react-redux';
import Dropdown from '../framework/Dropdown';
import { getPhysicalInputs, getVirtualInputs } from '../../state/selectors';

const mapStateToProps = (state, ownProps) => {

  let states;
  if(ownProps.type === 'physicalInputs'){
    states = getPhysicalInputs(state);
  } else if(ownProps.type === 'virtualInputs'){
    states = getVirtualInputs(state);
  }

  let byId = states.get("byId");
  let inputs = byId.toJS();


  return {
    values: inputs,
    value: ownProps.value,
    nameFunc: name => name.full
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
