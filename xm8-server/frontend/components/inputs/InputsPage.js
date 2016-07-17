import InputFormContainer from './InputFormContainer';
import InputsLeftMenuContainer from './InputsLeftMenuContainer';

const InputsPage = () => {    
  return (  
    <div>
      <div className="leftcolumn">
        <InputsLeftMenuContainer/>
      </div>
      <div className="centercolumn">
        <InputFormContainer/>
      </div>
    </div>
  ) 
}

export default InputsPage;  
