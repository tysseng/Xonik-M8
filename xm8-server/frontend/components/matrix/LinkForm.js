import React from 'react'

const LinkFormComponent = ({link, onLinkNameChange}) => {

  if(!link) return null;

  return <form className="linkForm">
    <div className="heading">Link properties</div>
    <div>
      <label htmlFor="linkName">Name</label>     
      <input id="linkName" type="text" onChange={(e) => onLinkNameChange(link.to, link.toParam,  e.target.value)} value={link.name}/>
    </div>    
  </form>

}

export default LinkFormComponent;