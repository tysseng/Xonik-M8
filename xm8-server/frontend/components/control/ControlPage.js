import ControlCenterColumnContainer from './ControlCenterColumnContainer';
import ControlLeftMenuContainer from './ControlLeftMenuContainer';
import VoiceGroupSelectorContainer from '../patch/VoiceGroupSelectorContainer';
const ControlPage = () => {    
  return (  
    <div id="controlPage">
      <div className="row">
        <div className="leftcolumn">
          <ControlLeftMenuContainer/>
        </div>
        <div className="centercolumn">
          <ControlCenterColumnContainer/>
        </div>
      </div>
      <div className="row">
        <div className="rightcolumn">
          <VoiceGroupSelectorContainer/>
        </div>
      </div>
    </div>
  ) 
}

export default ControlPage;  
