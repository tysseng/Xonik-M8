import React from 'react'
import MenuItem from './MenuItem'
import { Link } from 'react-router';

const MainMenu = () => {
  /*
   <Link to="/home" activeClassName="selected">
   <MenuItem label="Home" icon="house.svg" onClick={() => console.log("Home")}/>
   </Link>

   */
  return (
    <div className="mainmenu">
      <div className="group">
        <Link to="/control" activeClassName="selected">
          <MenuItem label="Control" icon="settings.svg" onClick={() => console.log("Control")}/>
        </Link>
        <Link to="/patches" activeClassName="selected">
          <MenuItem label="Patch" icon="network.svg" onClick={() => console.log("Patches")}/>
        </Link>
      </div>
      <div className="group">
        <Link to="/physicalinputs" activeClassName="selected">
          <MenuItem label="Panel" icon="settings-1.svg" onClick={() => console.log("Physical")}/>
        </Link>
        <Link to="/settings" activeClassName="selected">
          <MenuItem label="Settings" icon="settings-1.svg" onClick={() => console.log("Settings")}/>
        </Link>
      </div>
      <div className="group">
        <Link to="/files" activeClassName="selected">
          <MenuItem label="Files" icon="folder.svg" onClick={() => console.log("Files")}/>
        </Link>
        <Link to="/trash" activeClassName="selected">
          <MenuItem label="Trash" icon="garbage.svg" onClick={() => console.log("Trash")}/>
        </Link>
      </div>
      <div className="group">
        <Link to="/network" activeClassName="selected">
          <MenuItem label="Network" icon="wifi-2.svg" onClick={() => console.log("Network")}/>
        </Link>
      </div>
    </div>
  )
}

export default MainMenu;