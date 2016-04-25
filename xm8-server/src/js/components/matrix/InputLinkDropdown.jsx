var React = require('react');

var InputLinkDropdown = React.createClass({

  handleChange: function(e){
    this.props.onInputLinkChange(this.refs.inputLinkDropdown.value);
  },

  render: function(){
    return (
      <select value={this.props.inputLinkId} ref="inputLinkDropdown" onChange={this.handleChange}>
        <option value="">Not selected</option>
        <option value="0">Input 0</option>
        <option value="1">Input 1</option>
        <option value="2">Input 2</option>
        <option value="3">Input 3</option>  
      </select>
    );
  }
});

module.exports = InputLinkDropdown;