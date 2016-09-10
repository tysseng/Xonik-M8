import { connect } from 'react-redux';

import { updateField } from '../../../shared/state/actions/inputs';
import DisplayOptionsForm from './DisplayOptionsForm'

const mapStateToProps = (state, ownProps) => {

  return {
    input: ownProps.input
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onScaleChange: (id, value) => dispatch(updateField(id, ['scale'], value)),
    onTypeChange: (id, value) => dispatch(updateField(id, ['type'], value)),
    onMinChange: (id, value) => dispatch(updateField(id, ['min'], value)), 
    onMaxChange:  (id, value) => dispatch(updateField(id, ['max'], value)),
    onStepGenerationModeChange:  (id, value) => dispatch(updateField(id, ['stepGenerationMode'], value)),
    onStepIntervalChange:  (id, value) => dispatch(updateField(id, ['stepInterval'], value)), 
    onNumberOfStepsChange:  (id, value) => dispatch(updateField(id, ['numberOfSteps'], value))
  }
}

const DisplayOptionsFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayOptionsForm);

export default DisplayOptionsFormContainer;
