import Controller from '../control/Controller';

const InputPreview = ({ input, value }) => {

  if(!input){
    return null;
  }

  return (
    <div className='configPane'>        
      <div className="heading">Controller preview</div>
      <div className='contents'>
        <Controller input={input} value={value}/>
      </div>    
    </div>        
  )
}

export default InputPreview;