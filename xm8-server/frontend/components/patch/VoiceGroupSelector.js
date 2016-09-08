const VoiceGroupSelector = ({selectedVoiceGroupId, changeVoiceGroup}) => {
  
  return (
    <div>
      <div className="topSubMenu">
        <span>Selected: {selectedVoiceGroupId}</span>
        <span onClick={()=>changeVoiceGroup('0')}>---1---</span>
        <span onClick={()=>changeVoiceGroup('1')}>---2---</span>
      </div>
    </div>
  )
}

export default VoiceGroupSelector;