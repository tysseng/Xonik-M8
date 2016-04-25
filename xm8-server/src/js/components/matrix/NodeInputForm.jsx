var React = require('react');

var NodeInputTypeDropdown = require('./NodeInputTypeDropdown.jsx');
var NodeLinkDropdown = require('./NodeLinkDropdown.jsx');
var InputLinkDropdown = require('./InputLinkDropdown.jsx');
var OutputLinkDropdown = require('./OutputLinkDropdown.jsx');
var InputUnitDropdown = require('./InputUnitDropdown.jsx');



var NodeInputForm = React.createClass({

  handleInputTypeChange: function(inputType){
    this.props.onInputTypeChange(this.props.inputDefinition.id, inputType);
  },

  render: function(){
    var body;

    switch(this.props.inputSettings.type){
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
        body = <span><input type="text"/><InputUnitDropdown/></span>;
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