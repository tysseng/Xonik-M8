//TODO: Check if unused is a legal option

var React = require('react');

var nodeTypes = require('./NodeTypes.js');

var NodeInputTypeDropdown = React.createClass({

  handleChange: function(e){
    this.props.onInputTypeChange(this.refs.nodeInputType.value);
  },

  render: function(){
    return (
      <select id={this.props.id} value={this.props.value} ref="nodeInputType" onChange={this.handleChange}>
        <option value="unused">Unused</option>
        <option value="input">Input from</option>
        <option value="result">Result of</option>
        <option value="constant">Constant</option>        
      </select>
    );
  }
});

module.exports = NodeInputTypeDropdown;