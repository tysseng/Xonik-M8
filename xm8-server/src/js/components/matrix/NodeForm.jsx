var React = require('react');
var update = require('react-addons-update');

var _ = require('lodash');

var NodeTypeDropdown = require('./NodeTypeDropdown.jsx');
var NodeInputForm = require('./NodeInputForm.jsx');

var nodeTypes = require('./NodeTypes.js');

var NodeForm = React.createClass({


  getInitialState: function() {


    var initialNodeState = {
      type: nodeTypes[2],
      inputs: []
    }

    for(var i=0; i<8; i++){
      initialNodeState.inputs.push({
        type: "undefined"
      })
    }

    return initialNodeState;
  },

  handleTypeChange: function(typeId){

    var nodeType = _.find(nodeTypes, function(type) { 
      return type.id == typeId; 
    });

    this.setState({
      type: nodeType
    });
  },

  handleInputTypeChange: function(inputId, inputType){ 
    var inputs = update(this.state.inputs, {
      [inputId]: {
        type: {$set: inputType}
      }
    })

    this.setState({inputs: inputs});
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
          <label htmlFor="nodeType">Node type</label><NodeTypeDropdown id="nodeType" nodeTypeId={this.state.type.id} onNodeTypeChange={this.handleTypeChange}/>
        </p>
        <h3>Parameters</h3>                  
        <p>             
          {this.state.type.inputs.map(function(input){
            return <NodeInputForm key={input.id} inputDefinition={input} inputSettings={that.state.inputs[input.id]} onInputTypeChange={that.handleInputTypeChange}/> 
          })}
        </p>        
        <input type="submit" value="Save"/>
      </form>
    );
  }
});

module.exports = NodeForm;