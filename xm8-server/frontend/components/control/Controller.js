import InputFader from './InputFader';

const Controller = ({input, value, style}) => {

  switch(input.type){
    case 'VERTICAL_RANGE':
    case 'HORIZONTAL_RANGE':
      return <div style={style}><InputFader key={input.id} input={input} value={value}/></div>
    default:
      return null;
  }
}

export default Controller;