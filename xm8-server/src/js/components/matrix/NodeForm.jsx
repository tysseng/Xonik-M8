// TODO: REset value, unit and input type. Currently the reset does not clear type and unit.

var React = require('react');
var update = require('react-addons-update');

var _ = require('lodash');

var NodeTypeDropdown = require('./NodeTypeDropdown.jsx');
var NodeParameterForm = require('./NodeParameterForm.jsx');

var nodeTypes = require('./NodeTypes.js');

var NodeForm = React.createClass({

  getEmptyParams: function() {
    var parameters = [];
    for(var i=0; i<8; i++){
      parameters.push({
        type: "undefined",
        value: "",
        unit: ""
      })
    }
    return parameters;    
  },

  getInitialState: function() {
    var initialNodeState = {
      type: nodeTypes[2],
      parameters: this.getEmptyParams()
    }

    return initialNodeState;
  },

  handleTypeChange: function(typeId){

    var nodeType = _.find(nodeTypes, function(type) { 
      return type.id == typeId; 
    });

    this.setState({
      type: nodeType,
      parameters: this.getEmptyParams()
    });

  },

  handleParameterTypeChange: function(parameterId, parameterType, parameterUnit){ 
    console.log("Param type change: " + parameterId + ", " + parameterType);    
    var parameters = update(this.state.parameters, {
      [parameterId]: {
        type: {$set: parameterType},
        value: {$set: ""},
        unit: {$set: parameterUnit},
      }
    })

    this.setState({parameters: parameters});
  },

  handleParameterUnitChange: function(parameterId, parameterUnit){ 
    console.log("Unit change: " + parameterId + ", " + parameterUnit);    
    var parameters = update(this.state.parameters, {
      [parameterId]: {
        unit: {$set: parameterUnit}
      }
    })

    this.setState({parameters: parameters});
  },

  handleParameterValueChange: function(parameterId, parameterValue){ 
    console.log("Value change: " + parameterId + ", " + parameterValue);
    var parameters = update(this.state.parameters, {
      [parameterId]: {
        value: {$set: parameterValue}
      }
    })

    this.setState({parameters: parameters});
  },

  handleSubmit: function(e){
    e.preventDefault(); 
  },

  render: function(){
    var that = this;
    return (
      <form className="voiceGroupForm" onSubmit={this.handleSubmit}>

        <h3>General</h3>
        <p>          
          <label htmlFor="nodeType">Node type</label>
          <NodeTypeDropdown id="nodeType" nodeTypeId={this.state.type.id} onNodeTypeChange={this.handleTypeChange}/>
        </p>
        <h3>Parameters</h3>                  
        <p>             
          {this.state.type.parameters.map(function(parameter){
            return <NodeParameterForm 
                      key={parameter.id} 
                      parameterDefinition={parameter} 
                      parameterSettings={that.state.parameters[parameter.id]} 
                      onParameterTypeChange={that.handleParameterTypeChange}
                      onParameterUnitChange={that.handleParameterUnitChange}
                      onParameterValueChange={that.handleParameterValueChange}/> 
          })}
        </p>        
        <input type="submit" value="Save"/>
      </form>
    );
  }
});

module.exports = NodeForm;