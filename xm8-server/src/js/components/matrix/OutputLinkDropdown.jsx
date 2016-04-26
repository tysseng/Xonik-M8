var React = require('react');
var outputs = require('../../../../shared/matrix/Outputs.js');

var OutputLinkDropdown = React.createClass({

  handleChange: function(e){
    this.props.onOutputLinkChange(this.refs.outputLinkDropdown.value);
  },

  render: function(){
    return (
      <select value={this.props.outputLinkId} ref="outputLinkDropdown" onChange={this.handleChange}>
        <option key={-1} value="">Not selected</option>
        {outputs.map(function(output){
          return <option key={output.id} value={output.id}>{output.name}</option>
        })}
      </select>
    );
  }
});

module.exports = OutputLinkDropdown;