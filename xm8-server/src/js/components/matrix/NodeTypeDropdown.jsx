var React = require('react');
var nodeTypes = require('../../../../shared/matrix/NodeTypes.js');

var NodeTypeDropdown = React.createClass({

  handleChange: function(e){
    this.props.onNodeTypeChange(this.refs.nodeType.value);
  },

  render: function(){
    return (
      <select id="nodeType" value={this.props.nodeTypeId} ref="nodeType" onChange={this.handleChange}>
        {nodeTypes.list.map(function(nodeType){
          return <option key={nodeType.id} value={nodeType.id}>{nodeType.name}</option>
        })}
      </select>
    );
  }
});

module.exports = NodeTypeDropdown;