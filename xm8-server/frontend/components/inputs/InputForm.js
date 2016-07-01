import _ from 'lodash';

import MiniIcon from '../framework/MiniIcon';

import inputTypes from '../../../shared/inputs/InputTypes';

const InputForm = ({ input, onCloseDialog, rename, renameShort }) => {

  if(!input){
    return null;
  }

  return (

    <form className="inputForm configPane">
      <div className="heading">Input<MiniIcon label="Close" icon="cancel.svg" onClick={onCloseDialog}/></div>

      <div className='contents'>
        <div>
          <label htmlFor="name">Full name</label>           
          <input id="name" type="text" value={input.name.full} onChange={(e) => rename(input.id, e.target.value)}/>
          <label htmlFor="shortname">Short name</label>           
          <input id="shortname" type="text" value={input.name.short} onChange={(e) => renameShort(input.id, e.target.value)}/>
        </div>
      </div>    
    </form>
  )
}

export default InputForm;