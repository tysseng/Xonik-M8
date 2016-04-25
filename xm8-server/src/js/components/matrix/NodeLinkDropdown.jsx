var React = require('react');

var NodeLinkDropdown = React.createClass({

  handleChange: function(e){
    this.props.onNodeLinkChange(this.refs.nodeLinkDropdown.value);
  },

  render: function(){
    return (
      <select value={this.props.nodeLinkId} ref="nodeLinkDropdown" onChange={this.handleChange}>
        <option value="">Not selected</option>
        <option value="0">Node 0</option>
        <option value="1">Node 1</option>
        <option value="2">Node 2</option>
        <option value="3">Node 3</option>  
      </select>
    );
  }
});

module.exports = NodeLinkDropdown;