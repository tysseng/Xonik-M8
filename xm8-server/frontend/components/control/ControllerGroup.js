import Controller from './Controller';

const ControllerGroup = ({group, inputs, inputValues}) => {

  if(!group){
    return null;
  }

  return (
    <div className="controllerGroup">
      {
        Object.values(group.children).map(inputId => {
          let input = inputs[inputId]; 
          let value = inputValues[inputId];                   
          return <Controller input={input} value={value}/>
        })
      }
    </div>
  )
}

export default ControllerGroup;