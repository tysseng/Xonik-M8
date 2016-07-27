import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Column, Cell } from 'fixed-data-table';

import outputs from '../../../shared/graph/Outputs.js'

const RowLabelCell = ({inputs, hover, rowIndex, col, ...props}) => {
  let input = inputs[rowIndex];
  let className = 'buttonmatrixrows ' + (hover.inputId === input.id ? 'hover' : '');
  
  return (
    <Cell {...props} className={className}>
      {input.name.full}
    </Cell>
  )
};

const ColLabelCell = ({output, hover, ...props}) => {
  let className = 'buttonmatrixcols ' + (hover.outputId === output.id ? 'hover' : '');

  return (
    <Cell {...props} className={className}>
      <div className='rotated'>{output.name}</div>
    </Cell>
  )
};

const ButtonCell = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    let inputId = this.props.inputs[this.props.rowIndex].id;

    let currentlyOn = this.props.directoutput === inputId;
    let nextOn = nextProps.directoutput === inputId;
    return currentlyOn !== nextOn;
  },

  render: function() {
    let { inputs, outputId, directoutput, toggleButton, onHover, rowIndex } = this.props;

    let inputId = inputs[rowIndex].id;

    let className = 'matrixbutton';  

    if(directoutput === inputId){
      className += ' on';
    }

    return (
      <Cell>
        <div className={className} 
          onClick={() => toggleButton(inputId, outputId)} 
          onMouseOver={() => onHover(inputId, outputId)} 
          onMouseOut={() => onHover('','')}>
        </div>
      </Cell>
    )
  }
});

class TableTest extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {    
    let inputs = Object.values(this.props.inputs);
    let { directoutputs, toggleButton, onHover } = this.props;

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
          cell={<RowLabelCell inputs={inputs} hover={this.props.hover} col='0' />}
          fixed={true}
          width={170}/>

        {Object.values(outputs).map(output => {
          return <Column
            header={<ColLabelCell output={output} hover={this.props.hover}/>}
            key={'outputcol-' + output.id}
            cell={<ButtonCell 
              inputs={inputs} 
              directoutput={directoutputs[output.id]} 
              toggleButton={toggleButton} 
              onHover={onHover} 
              outputId={output.id}/>}
            width={36}/>
        })}
      </Table>
    );
  }
}

export default TableTest;