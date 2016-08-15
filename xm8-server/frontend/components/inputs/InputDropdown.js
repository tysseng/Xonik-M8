import { connect } from 'react-redux';
import Dropdown from '../framework/Dropdown';


const mapStateToProps = (state, ownProps) => {

  let inputs = state.inputs.get(ownProps.type).get('byId').toJS();

  return {
    values: inputs, 
    value: ownProps.value
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: value => ownProps.onChange(value),
    nameFunc: name => name.full
  }
}

const InputDropdown = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dropdown);

export default InputDropdown;