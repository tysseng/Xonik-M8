var React = require('react');

var inputUnits = require('./InputUnits.js');

var InputUnitDropdown = React.createClass({

  handleChange: function(e){
    this.props.onUnitChange(this.refs.unitDropdown.value);
  },

  render: function(){
    return (
      <select value={this.props.unitId} ref="unitDropdown" onChange={this.handleChange}>
        {inputUnits.map(function(inputUnit){
          return <option key={inputUnit.id} value={inputUnit.id}>{inputUnit.name}</option>
        })}
      </select>
    );
  }
});

module.exports = InputUnitDropdown;