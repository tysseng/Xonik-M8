import PhysicalInputFormContainer from './PhysicalInputFormContainer';
import PhysicalInputsLeftMenuContainer from './PhysicalInputsLeftMenuContainer';

const PhysicalInputsPage = () => {    
  return (  
    <div>
      <div className="leftcolumn">
        <PhysicalInputsLeftMenuContainer/>
      </div>
      <div className="centercolumn">
        <PhysicalInputFormContainer/>
      </div>
    </div>
  ) 
}

export default PhysicalInputsPage;  
