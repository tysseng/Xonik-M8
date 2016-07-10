import Controller from './Controller';

const ControllerGroup = ({group, inputs, inputValues}) => {

  if(!group){
    return null;
  }

  let i = 0;

  return (
    <div className="controllerGroup">
      {
        Object.values(group.children).map(inputId => {
          let input = inputs[inputId]; 
          let value = inputValues[inputId]; 

          let style = {
       
          }

          i++;

          return <Controller input={input} value={value} style={style}/>
        })
      }
    </div>
  )
}

export default ControllerGroup;