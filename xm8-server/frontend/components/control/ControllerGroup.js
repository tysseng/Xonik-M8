import Controller from './Controller';
import { inputTypesById } from '../../../shared/inputs/InputTypes';

const ControllerGroup = ({group, inputs, inputValues}) => {

  if(!group){
    return null;
  }

  return (
    <div className="controllerGroup">
      {
        Object.values(group.elements).map(element => {
          let inputId = element.elementId;
          let input = inputs[inputId];
          let value = inputValues[inputId];

          // override default input type to render input differently for this group
          if(element.type && element.type !== ''){
            input.type = element.type;
          }

          let type = inputTypesById[input.type];

          let style={
            top: element.offset.y + 'em',
            left: element.offset.x + 'em',
            height: type.size.y + 'em',
            width: type.size.x + 'em'
          };

          return (
            <div className="controller draggable" style={style} id={inputId}>
              <Controller input={input} value={value}/>
            </div>
          )
        })
      }
    </div>
  )
}

export default ControllerGroup;