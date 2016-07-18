import ModalBox from '../framework/ModalBox'; 
import InputDropdown from '../inputs/InputDropdown';    

const ElementSelectorDialog = ({newElementDialog, selectedGroupId, onCancel, onAdd, selectElement}) => {
  let inputvalue = '';
  let groupvalue = '';

  if(newElementDialog.type === 'input'){
    inputvalue = newElementDialog.id;
  } else if(newElementDialog.type === 'group'){
    groupvalue = newElementDialog.id;
  }

  return ( 
    <ModalBox heading='Add element' boxClass='linkdialog'>
      <div>
        <div className="intro">What element do you want to add to the group?</div>
        <div>
          <div>Input</div>
          <InputDropdown value={inputvalue} onChange={(value) => selectElement('input', value)}/>
          <div>or</div>
          <div>Group</div>
          <InputDropdown value={groupvalue} onChange={(value) => selectElement('group', value)}/>
          <div>GROUP DROPDOWN HERE</div>
        </div>
      </div>

      <div>
        <button type="button" onClick={onCancel}>Cancel</button>
        <button 
          type="button" 
          disabled={newElementDialog.id === ''} 
          onClick={() => onAdd(selectedGroupId, newElementDialog.type, newElementDialog.id)}>
          Add
        </button>
      </div>
    </ModalBox>
  )
}

export default ElementSelectorDialog;