import MenuItem from '../framework/MenuItem';

const ControlLeftMenu = ({ groups, selectedGroupId, selectGroup}) => {

  return (
    <div>
      <div className="leftMenu">
        {
          Object.values(groups).map(group => {
            return group.isVisible !== false && <MenuItem
                label={group.name}
                icon="settings.svg"
                onClick={() => selectGroup(group.id)}
                selected={group.id === selectedGroupId}
              />
          })
        }
      </div>
    </div>
  )
}

export default ControlLeftMenu;