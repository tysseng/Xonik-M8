import React from 'react'

const MainMenu = () => {    
  return (
    <div className="mainmenu">
      <span className="icon"><img src="img/icons/house.svg"/><div className="name">Home</div></span>
      <span className="icon"><img src="img/icons/network.svg"/><div className="name">Patches</div></span>
      <span className="icon"><img src="img/icons/settings.svg"/><div className="name">Control</div></span>
      <span className="icon"><img src="img/icons/folder.svg"/><div className="name">Files</div></span>
      <span className="icon"><img src="img/icons/settings-1.svg"/><div className="name">Settings</div></span>
      <span className="icon"><img src="img/icons/wifi-2.svg"/><div className="name">Network</div></span>
      <span className="icon"><img src="img/icons/garbage.svg"/><div className="name">Trash</div></span>
    </div>
  ) 
}

export default MainMenu;