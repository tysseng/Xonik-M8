import InputFader from './InputFader';
import { inputTypesById as inputTypes } from "../../../shared/inputs/InputTypes";

const Controller = ({input, value, style, readOnly=false}) => {

  switch(input.type){
    case inputTypes.VERTICAL_RANGE.id:
    case inputTypes.HORIZONTAL_RANGE.id:
      return <div style={style}><InputFader key={input.id} input={input} value={value} readOnly={readOnly}/></div>
    default:
      return null;
  }
}

export default Controller;