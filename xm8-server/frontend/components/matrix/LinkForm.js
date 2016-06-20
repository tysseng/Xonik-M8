import MiniIcon from '../framework/MiniIcon';
import LinkDescription from './LinkDescription';
const LinkFormComponent = ({link, nodes, onLinkNameChange, onCloseDialog}) => {

  if(!link) return null;

  return <form className="linkForm configPane">
    <div className="heading">Link properties<MiniIcon label="Close" icon="cancel.svg" onClick={onCloseDialog}/></div>
    <div className="contents">
      <LinkDescription link={link} nodes={nodes}/> 
      <label htmlFor="linkName">Name</label>         
      <input id="linkName" type="text" onChange={(e) => onLinkNameChange(link.to, link.toParam,  e.target.value)} value={link.name}/>
    </div>    
  </form>

}

export default LinkFormComponent;