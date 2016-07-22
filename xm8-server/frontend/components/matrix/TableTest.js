import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Column, Cell } from 'fixed-data-table';

import outputs from '../../../shared/graph/Outputs.js'

const RowLabelCell = ({rowIndex, data, col, ...props}) => {

  return (
    <Cell {...props}>
      {data[rowIndex].name.full}
    </Cell>
  )
};

const ColLabelCell = ({data, ...props}) => {

  return (
    <Cell {...props}>
      <div className='buttonmatrixcols'><div>{data.name}</div></div>
    </Cell>
  )
};

const ButtonCell = ({rowIndex, data, col, ...props}) => {

  let { inputs, directoutputs, toggleButton, hover } = data;

  let inputId = inputs[rowIndex].id;
  let outputId = col;

  let className = 'matrixbutton';  
  if(directoutputs[outputId] === inputId){
    className += ' on';
  }

  return (
    <Cell {...props}>
      <div className={className} 
        onClick={() => toggleButton(inputId, outputId)} 
        onMouseOver={() => hover(inputId, outputId)} 
        onMouseOut={() => hover('','')}        
        >
      </div>
    </Cell>
  )
};

class TableTest extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {    
    let inputs = Object.values(this.props.inputs);

    let dataList = {
      inputs: inputs,
      directoutputs: this.props.directoutputs,
      toggleButton: this.props.toggleButton,
      hover: this.props.hover
    }

    return (
      <Table
        rowHeight={36}
        headerHeight={120}
        rowsCount={inputs.length}
        width={1000}
        height={500}
        {...this.props}>

        <Column
          header={<Cell></Cell>}
          cell={<RowLabelCell data={inputs} col='0' />}
          fixed={true}
          width={170}/>

        {Object.values(outputs).map(output => {
          return <Column
            header={<ColLabelCell data={output}/>}
            key={'outputcol-' + output.id}
            cell={<ButtonCell data={dataList} col={output.id}/>}
            width={36}/>
        })}
      </Table>
    );
  }
}

export default TableTest;