//TODO: Check if unused is a legal option

var React = require('react');

var parameterTypes = require('./ParameterTypes.js');

var NodeParameterTypeDropdown = React.createClass({

  handleChange: function(e){
    this.props.onParameterTypeChange(this.refs.nodeParameterType.value);
  },

  render: function(){
    return (
      <select id={this.props.id} value={this.props.value} ref="nodeParameterType" onChange={this.handleChange}>
        {parameterTypes.map(function(parameterType){
          return <option key={parameterType.id} value={parameterType.id}>{parameterType.name}</option>
        })}       
      </select>
    );
  }
});

module.exports = NodeParameterTypeDropdown;