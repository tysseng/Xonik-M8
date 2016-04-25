var React = require('react');

var NodeParameterTypeDropdown = require('./NodeParameterTypeDropdown.jsx');
var NodeLinkDropdown = require('./NodeLinkDropdown.jsx');
var InputLinkDropdown = require('./InputLinkDropdown.jsx');
var OutputLinkDropdown = require('./OutputLinkDropdown.jsx');
var ParameterUnitDropdown = require('./ParameterUnitDropdown.jsx');



var NodeParameterForm = React.createClass({

  handleParameterTypeChange: function(parameterType){

    var value = "";
    var unit = "";

    if(parameterType === "constant"){
      unit = "0";
  }
    this.props.onParameterTypeChange(this.props.parameterDefinition.id, parameterType, unit);
  },

  handleParameterValueChange: function(parameterType){
    this.props.onParameterValueChange(this.props.parameterDefinition.id, parameterType);
  }, 

  handleInputFieldParameterValueChange: function(event){
    this.props.onParameterValueChange(this.props.parameterDefinition.id, event.target.value);
  }, 

  handleParameterUnitChange: function(unit){
    this.props.onParameterUnitChange(this.props.parameterDefinition.id, unit);
  },  


  render: function(){
    var body;

    switch(this.props.parameterSettings.type){
      case "unused":
        body = "";
        break;
      case "input":
        body = <InputLinkDropdown onInputLinkChange={this.handleParameterValueChange} value={this.props.parameterSettings.value}/>;
        break;
      case "output":
        body = <OutputLinkDropdown onOutputLinkChange={this.handleParameterValueChange} value={this.props.parameterSettings.value}/>;
        break;
      case "result":
        body = <NodeLinkDropdown onNodeLinkChange={this.handleParameterValueChange} value={this.props.parameterSettings.value}/>;
        break;
      case "constant":
        body = 
          <span>
            <input type="text" onChange={this.handleInputFieldParameterValueChange} value={this.props.parameterSettings.value}/>
            <ParameterUnitDropdown onUnitChange={this.handleParameterUnitChange} value={this.props.parameterSettings.unit}/>
          </span>;
        break;
    }

    return (
      <span>
        {this.props.parameterDefinition.name}:
        <NodeParameterTypeDropdown value={this.props.parameterSettings.type} onParameterTypeChange={this.handleParameterTypeChange}/> 
        {body}<br/>
      </span>
    );
  }
});

module.exports = NodeParameterForm;