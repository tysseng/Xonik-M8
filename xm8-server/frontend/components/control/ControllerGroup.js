import React from 'react';
import InputFader from './InputFader';

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

          switch(input.type){
            case 'vertical_range':
            case 'horizontal_range':
              return <InputFader key={input.id} input={input} value={value}/>
            default:
              return null;
          }
        })
      }
    </div>
  )
}

export default ControllerGroup;