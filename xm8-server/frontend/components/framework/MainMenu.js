import React from 'react'
import MenuItem from './MenuItem'

const MainMenu = () => {    
  return (
    <div className="mainmenu">
      <MenuItem label="Home" icon="house.svg" onClick={() => console.log("Home")}/>
      <MenuItem label="Patches" icon="network.svg" onClick={() => console.log("Patches")} selected={true}/>
      <MenuItem label="Control" icon="settings.svg" onClick={() => console.log("Control")}/>
      <MenuItem label="Files" icon="folder.svg" onClick={() => console.log("Files")}/>
      <MenuItem label="Settings" icon="settings-1.svg" onClick={() => console.log("Settings")}/>
      <MenuItem label="Network" icon="wifi-2.svg" onClick={() => console.log("Network")}/>
      <MenuItem label="Trash" icon="garbage.svg" onClick={() => console.log("Trash")}/>
    </div>
  ) 
}

export default MainMenu;