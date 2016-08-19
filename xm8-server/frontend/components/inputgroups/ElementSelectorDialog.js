import ModalBox from '../framework/ModalBox'; 
import InputDropdown from '../inputs/InputDropdown';    

const ElementSelectorDialog = ({newElementDialog, selectedGroupId, onCancel, onAdd, selectElement}) => {
  let physicalInputValue = '';
  let virtualInputValue = '';

  if(newElementDialog.type === 'physicalInput'){
    physicalInputValue = newElementDialog.id;
  } else if(newElementDialog.type === 'virtualInput'){
    virtualInputValue = newElementDialog.id;
  }
  return (
    <ModalBox heading='Add element' boxClass='linkdialog'>
      <div>
        <div className="intro">What element do you want to add to the group?</div>
        <div>
          <div>Physical input</div>
          <InputDropdown type='physicalInputs' value={physicalInputValue} onChange={(value) => selectElement('physicalInput', value)}/>
        </div>
        <div><p>or</p></div>
        <div>
          <div>Virtual input</div>
          <InputDropdown type='virtualInputs' value={virtualInputValue} onChange={(value) => selectElement('virtualInput', value)}/>
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