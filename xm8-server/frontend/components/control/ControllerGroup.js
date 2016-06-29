import React from 'react';
import Fader from './Fader';

const ControllerGroup = ({group, inputs}) => {

  console.log("g2", group);
  if(!group){
    return null;
  }


  return (
    <div className="controllerGroup">
      {
        Object.values(group.children).map(inputId => {
          let input = inputs[inputId];

          switch(input.type){
            case 'vertical_range':
              return <Fader key={input.id} value={input.value} label={input.name.short} min={input.min} max={input.max} step={input.step}/>
            case 'horizontal_range':
              return <Fader key={input.id} value={input.value} label={input.name.short} orientation='horizontal'/>
            default:
              return null;
          }
        })
      }
    </div>
  )
}

export default ControllerGroup;