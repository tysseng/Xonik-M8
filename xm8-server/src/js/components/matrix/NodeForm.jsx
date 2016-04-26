// TODO: REset value, unit and input type. Currently the reset does not clear type and unit.

var React = require('react');
var update = require('react-addons-update');

var _ = require('lodash');
var $ = require('jquery');

var NodeTypeDropdown = require('./NodeTypeDropdown.jsx');
var NodeParameterForm = require('./NodeParameterForm.jsx');

var nodeTypes = require('../../../../shared/matrix/NodeTypes.js');

var NodeForm = React.createClass({

  getEmptyParams: function() {
    var params = [];
    for(var i=0; i<8; i++){
      params.push({
        id: i,
        type: "unused",
        value: "",
        unit: ""
      })
    }
    return params;    
  },

  getInitialState: function() {
    var initialNodeState = {
      type: nodeTypes.map.INVERT.id,
      params: this.getEmptyParams()
    }
    return initialNodeState;
  },

  handleTypeChange: function(typeId){

    this.setState({
      type: typeId,
      params: this.getEmptyParams()
    });

  },

  handleParameterTypeChange: function(parameterId, parameterType, parameterUnit){ 
    console.log("Param type change: " + parameterId + ", " + parameterType);    
    var params = update(this.state.params, {
      [parameterId]: {
        type: {$set: parameterType},
        value: {$set: ""},
        unit: {$set: parameterUnit},
      }
    })

    this.setState({params: params});
  },

  handleParameterUnitChange: function(parameterId, parameterUnit){ 
    console.log("Unit change: " + parameterId + ", " + parameterUnit);    
    var params = update(this.state.params, {
      [parameterId]: {
        unit: {$set: parameterUnit}
      }
    })

    this.setState({params: params});
  },

  handleParameterValueChange: function(parameterId, parameterValue){ 
    console.log("Value change: " + parameterId + ", " + parameterValue);
    var params = update(this.state.params, {
      [parameterId]: {
        value: {$set: parameterValue}
      }
    })

    this.setState({params: params});
  },

  handleSubmit: function(e){

    var type = this.state.hasOwnProperty('id') ? 'PUT' : 'POST';
    var url = this.state.hasOwnProperty('id') ? this.props.url + '/' + this.state.id : this.props.url; 

    e.preventDefault(); 
    $.ajax({
      url: url,
      dataType: 'json',
      contentType: 'application/json',
      type: type,
      data: JSON.stringify(this.state),
      success: function(data) {
        this.setState(data, function(){console.log(this.state)});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },  

  render: function(){
    var that = this;
    var nodeType = nodeTypes.idMap[this.state.type];    

    return (
      <form className="voiceGroupForm" onSubmit={this.handleSubmit}>

        <h3>General</h3>
        <p>          
          <label htmlFor="nodeType">Node type</label>
          <NodeTypeDropdown id="nodeType" nodeTypeId={this.state.type} onNodeTypeChange={this.handleTypeChange}/>
        </p>
        <h3>Parameters</h3>                  
        <p>             
          {
            nodeType.params.map(function(parameter){
            return <NodeParameterForm 
                      key={parameter.id} 
                      parameterDefinition={parameter} 
                      parameterSettings={that.state.params[parameter.id]} 
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