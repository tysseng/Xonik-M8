var React = require('react');

var parameterUnits = require('./ParameterUnits.js');

var ParameterUnitDropdown = React.createClass({

  handleChange: function(e){
    this.props.onUnitChange(this.refs.unitDropdown.value);
  },

  render: function(){
    return (
      <select value={this.props.unitId} ref="unitDropdown" onChange={this.handleChange}>
        {parameterUnits.map(function(parameterUnit){
          return <option key={parameterUnit.id} value={parameterUnit.id}>{parameterUnit.name}</option>
        })}
      </select>
    );
  }
});

module.exports = ParameterUnitDropdown;