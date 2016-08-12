import VirtualInputFormContainer from './VirtualInputFormContainer';
import VirtualInputsLeftMenuContainer from './VirtualInputsLeftMenuContainer';

const VirtualInputsPage = () => {    
  return (  
    <div>
      <div className="leftcolumn">
        <VirtualInputsLeftMenuContainer/>
      </div>
      <div className="centercolumn">
        <VirtualInputFormContainer/>
      </div>
    </div>
  ) 
}

export default VirtualInputsPage;  
