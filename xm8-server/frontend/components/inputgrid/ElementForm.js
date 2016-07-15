import React from 'react';

import MiniIcon from '../framework/MiniIcon';
import InputTypesDropdown from '../inputs/InputTypesDropdown';

const ElementForm = ({ element, changeElementType, onCloseDialog }) => {

  if(!element){
    return null;
  }

  return (

    <form className="elementForm configPane">
      <div className="heading">Display options<MiniIcon label="Close" icon="cancel.svg" onClick={onCloseDialog}/></div>

      <div className='contents'>
        <label>Show as</label> 
        <InputTypesDropdown value={element.type} onTypeChange={(value) => changeElementType(element.groupId, element.id, value)} showDefault={true}/>          
      </div>    
    </form>
  )

}

export default ElementForm;