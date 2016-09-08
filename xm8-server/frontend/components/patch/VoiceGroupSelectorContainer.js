import { connect } from 'react-redux';
import VoiceGroupSelector from './VoiceGroupSelector';
import { changeVoiceGroup } from '../../../shared/state/actions/patch';
import { getPatchviews } from '../../state/selectors';

const mapStateToProps = (state, ownProps) => {
  let patchviewsRoot = getPatchviews(state);
  return {
    selectedVoiceGroupId: patchviewsRoot.get('selectedPatchNumber'),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeVoiceGroup: voiceGroupId => dispatch(changeVoiceGroup(voiceGroupId))
  }
}

const VoiceGroupSelectorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VoiceGroupSelector);

export default VoiceGroupSelectorContainer;