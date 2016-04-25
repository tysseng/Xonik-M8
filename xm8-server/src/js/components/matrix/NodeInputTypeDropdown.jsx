//TODO: Check if unused is a legal option

var React = require('react');

var inputTypes = require('./InputTypes.js');

var NodeInputTypeDropdown = React.createClass({

  handleChange: function(e){
    this.props.onInputTypeChange(this.refs.nodeInputType.value);
  },

  render: function(){
    return (
      <select id={this.props.id} value={this.props.value} ref="nodeInputType" onChange={this.handleChange}>
        {inputTypes.map(function(inputType){
          return <option key={inputType.id} value={inputType.id}>{inputType.name}</option>
        })}       
      </select>
    );
  }
});

module.exports = NodeInputTypeDropdown;