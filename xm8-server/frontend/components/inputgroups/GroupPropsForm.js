import React from 'react';

import MiniIcon from '../framework/MiniIcon';
import InputTypesDropdown from '../inputs/InputTypesDropdown';

const GroupPropsForm = ({ selectedGroupId, groupName, isVisible, renameGroup, toggleVisibility }) => {

  if(!selectedGroupId){
    return null;
  }

  return (
    <form className="groupPropsForm configPane">
      <div className="heading">Group properties</div>

      <div className='contents'>
        <label>Name</label>
        <input type="text" value={groupName} onChange={e => renameGroup(selectedGroupId, e.target.value)}/>

        <label className="small">
          <input type="checkbox" checked={isVisible} onChange={e => toggleVisibility(selectedGroupId, e.target.checked)}/>
          Hide from controls
        </label>
      </div>
    </form>
  )
}

export default GroupPropsForm;