var React = require('react');

var NodeInputTypeDropdown = require('./NodeInputTypeDropdown.jsx');

var NodeInputForm = React.createClass({

  handleInputTypeChange: function(inputType){
    this.props.onInputTypeChange(this.props.inputDefinition.id, inputType);
  },

  render: function(){
    var body;

    switch(this.props.value){
      case "unused":
        body = "";
        break;
      case "input":
        body = "Input dropdown";
        break;
      case "result":
        body = "Node result";
        break;
      case "constant":
        body = "Constant";
        break;
    }

    return (
      <span>
        {this.props.inputDefinition.name}: <NodeInputTypeDropdown onInputTypeChange={this.handleInputTypeChange}/> {body}<br/>
      </span>
    );
  }
});

module.exports = NodeInputForm;