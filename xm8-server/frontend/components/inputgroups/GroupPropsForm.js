import React from 'react';

import MiniIcon from '../framework/MiniIcon';
import InputTypesDropdown from '../inputs/InputTypesDropdown';

const GroupPropsForm = ({ group, renameGroup, toggleVisibility }) => {

  if(!group){
    return null;
  }

  return (
    <form className="groupPropsForm configPane">
      <div className="heading">Group properties</div>

      <div className='contents'>
        <label>Name</label>
        <input type="text" value={group.name} onChange={e => renameGroup(group.id, e.target.value)}/>

        <label className="small">
          <input type="checkbox" checked={group.isVisible} onChange={e => toggleVisibility(group.id, e.target.checked)}/>
          Hide from controls
        </label>
      </div>
    </form>
  )
}

export default GroupPropsForm;