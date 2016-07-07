import InputFader from './InputFader';

const Controller = ({input, value}) => {

  switch(input.type){
    case 'VERTICAL_RANGE':
    case 'HORIZONTAL_RANGE':
      return <InputFader key={input.id} input={input} value={value}/>
    default:
      return null;
  }
}

export default Controller;