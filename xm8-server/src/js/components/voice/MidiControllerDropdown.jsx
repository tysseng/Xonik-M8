var React = require('react');

var midiControllers = require('./MidiControllers.js');

var MidiControllerDropdown = React.createClass({

  handleControllerChange: function(e){
    this.props.onControllerChange(this.refs.midiController.value);
  },

  handleResolutionChange: function(e){
    this.props.onResolutionChange(this.refs.controllerResolution.value);
  },

  render: function(){
    return (
      <div>
        <select id="{this.props.id}" value={this.props.controllerId} ref="midiController" onChange={this.handleControllerChange}>
          {midiControllers.map(function(controller){
            return <option value="{controller.id}">{controller.id + " " + controller.name}</option>
          })}
        </select>
        <input id="midiControllerHiRes{this.props.id}" type="checkbox" value={this.props.hiRes} ref="controllerResolution" onChange={this.handleAffectedByPitchBendChange}/><label htmlFor="midiControllerHiRes{this.props.id}">High resolution</label>
      </div>
    );
  }
});

module.exports = MidiControllerDropdown;