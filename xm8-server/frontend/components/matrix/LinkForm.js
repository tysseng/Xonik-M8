import React from 'react'

const LinkFormComponent = ({link, onLinkNameChange}) => {
  return <form>
    <h2>Link properties</h2>
    <p>
      <label htmlFor="linkName">Name</label>     
      <input id="linkName" type="text" onChange={(e) => onLinkNameChange(link.to, link.toParam,  e.target.value)} value={link.name}/>
    </p>    
  </form>

}

export default LinkFormComponent;