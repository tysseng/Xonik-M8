import config from '../../../shared/config';

const VoiceGroupSelector = ({selectedVoiceGroupId, changeVoiceGroup}) => {

  var voiceGroupButtons = [];
  for (var i = 0; i < config.voices.numberOfGroups; i++) {
    let voiceGroupId = '' + i;
    let voiceGroupName = '' + (i + 1);

    let className = 'voiceGroupButton';
    if(selectedVoiceGroupId === voiceGroupId){
      className += ' selected'
    }
    voiceGroupButtons.push(<div className={className} key={i} onClick={() => changeVoiceGroup(voiceGroupId)}>{voiceGroupName}</div>);
  }
  return (
    <div id="voiceGroupSelector">
      {voiceGroupButtons}
    </div>
  );
}

export default VoiceGroupSelector;