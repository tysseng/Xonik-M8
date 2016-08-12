import React from 'react'
import MenuItem from './MenuItem'
import { Link } from 'react-router';

const MainMenu = () => {    
  return (
    <div className="mainmenu">
      <Link to="/home" activeClassName="selected">
        <MenuItem label="Home" icon="house.svg" onClick={() => console.log("Home")}/>
      </Link> 
      <Link to="/patches" activeClassName="selected">
        <MenuItem label="Patches" icon="network.svg" onClick={() => console.log("Patches")}/>
      </Link>
      <Link to="/matrix" activeClassName="selected">
        <MenuItem label="Matrix" icon="network.svg" onClick={() => console.log("Matrix")}/>
      </Link>
      <Link to="/control" activeClassName="selected">
        <MenuItem label="Control" icon="settings.svg" onClick={() => console.log("Control")}/>
      </Link>
      <Link to="/files" activeClassName="selected">
        <MenuItem label="Files" icon="folder.svg" onClick={() => console.log("Files")}/>
      </Link>
      <Link to="/settings" activeClassName="selected">
        <MenuItem label="Settings" icon="settings-1.svg" onClick={() => console.log("Settings")}/>
      </Link>
      <Link to="/physicalinputs" activeClassName="selected">
        <MenuItem label="Physical" icon="settings-1.svg" onClick={() => console.log("Physical")}/>
      </Link>
      <Link to="/inputgroups" activeClassName="selected">
        <MenuItem label="Groups" icon="settings-1.svg" onClick={() => console.log("Groups")}/>
      </Link>
      <Link to="/network" activeClassName="selected">
        <MenuItem label="Network" icon="wifi-2.svg" onClick={() => console.log("Network")}/>
      </Link>
      <Link to="/trash" activeClassName="selected">
        <MenuItem label="Trash" icon="garbage.svg" onClick={() => console.log("Trash")}/>
      </Link>
    </div>
  ) 
}

export default MainMenu;