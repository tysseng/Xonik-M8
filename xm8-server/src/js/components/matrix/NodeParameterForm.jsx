var React = require('react');

var NodeParameterTypeDropdown = require('./NodeParameterTypeDropdown.jsx');
var NodeLinkDropdown = require('./NodeLinkDropdown.jsx');
var InputLinkDropdown = require('./InputLinkDropdown.jsx');
var OutputLinkDropdown = require('./OutputLinkDropdown.jsx');
var ParameterUnitDropdown = require('./ParameterUnitDropdown.jsx');



var NodeParameterForm = React.createClass({

  handleParameterTypeChange: function(parameterType){
    this.props.onParameterTypeChange(this.props.parameterDefinition.id, parameterType);
  },

  render: function(){
    var body;

    switch(this.props.parameterSettings.type){
      case "unused":
        body = "";
        break;
      case "input":
        body = <InputLinkDropdown/>;
        break;
      case "output":
        body = <OutputLinkDropdown/>;
        break;
      case "result":
        body = <NodeLinkDropdown/>;
        break;
      case "constant":
        body = <span><input type="text"/><ParameterUnitDropdown/></span>;
        break;
    }

    return (
      <span>
        {this.props.parameterDefinition.name}: <NodeParameterTypeDropdown onParameterTypeChange={this.handleParameterTypeChange}/> {body}<br/>
      </span>
    );
  }
});

module.exports = NodeParameterForm;