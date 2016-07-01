//import SettingsCenterColumnContainer from './SettingsCenterColumnContainer';
import InputsCenterColumnContainer from '../inputs/InputsCenterColumnContainer';
import InputFormContainer from '../inputs/InputFormContainer';

const SettingsPage = () => {    
  return (  
    <div>
      <div className="leftcolumn">
        Left
      </div>
      <div className="rightcolumn">
        <InputFormContainer/>
      </div>
      <div className="centercolumn">
        <InputsCenterColumnContainer/>
      </div>
    </div>
  ) 
}

export default SettingsPage;  
