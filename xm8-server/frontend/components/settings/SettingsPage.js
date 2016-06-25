import SettingsCenterColumnContainer from './SettingsCenterColumnContainer';

const SettingsPage = () => {    
  return (  
    <div>
      <div className="leftcolumn">
        Left
      </div>
      <div className="rightcolumn">
        Right
      </div>
      <div className="centercolumn">
        <SettingsCenterColumnContainer/>
      </div>
    </div>
  ) 
}

export default SettingsPage;  
