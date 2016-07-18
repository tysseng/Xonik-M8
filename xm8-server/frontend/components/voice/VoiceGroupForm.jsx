var React = require('react');
var MidiChannelDropdown = require('./MidiChannelDropdown.jsx');
var MidiControllerDropdown = require('./MidiControllerDropdown.jsx');

var VoiceGroupForm = React.createClass({


  getInitialState: function() {
    return {
      id: this.props.voiceId,
      name: "Group " + this.props.voiceId,
      keyboard: {
        // for keyboard split - start and end key on the keyboard
        start: 0,
        end: 60,
        shift: 0, // number of semitones to shift up/down

        // this allows multiple groups to be affected by these common controllers
        affectedByPitchBend: true, // midi pitch bend will still work independently of this setting
        affectedByModWheel: true,  // midi modulation will still work independently of this setting
        affectedByFootController: true  // midi foot controller will still work independently of this setting
      },
      midi: {
        channel: 0,
        controllerToInputMap: [], // what midi CCs are mapped to what input positions
        controllerHiRes: [] // what midi CCs are high res
      }
    };
  },

  handleNameChange: function(e){
    this.setState({name: e.target.value});
  },

  handleSubmit: function(e){
    e.preventDefault(); 
  },

  handleChannelChange: function(midiChannel){
    console.log("new channel: " + midiChannel);
    this.setState({midi: {channel: midiChannel}});
  },

  handleControllerChange: function(controllerId){
    console.log("new controller: " + controllerId);
    //this.setState({midi: {channel: midiChannel}});
  },


  render: function(){
    return (
      <form className="voiceGroupForm" onSubmit={this.handleSubmit}>
        <p>
          <h3>General</h3>
          <input type="text" placeholder="Group name" value={this.state.name} onChange={this.handleNameChange}/>
        </p>
        <p>
          <h3>Keyboard</h3>
          <input id="affectedByPitchBend" type="checkbox" value={this.state.keyboard.affectedByPitchBend} onChange={this.handleAffectedByPitchBendChange}/><label htmlFor="affectedByPitchBend">Affected by pitch bend</label><br/>
          <input id="affectedByModWheel" type="checkbox" value={this.state.keyboard.affectedByModWheel} onChange={this.handleAffectedByModWheel}/><label htmlFor="affectedByModWheel">Affected by mod wheel</label><br/>
          <input id="affectedByFootController" type="checkbox" value={this.state.keyboard.affectedByFootController} onChange={this.handleAffectedByFootController}/><label htmlFor="affectedByFootController">Affected  by foot controller</label><br/>
        </p>
        <p>
          <h3>Midi</h3>
          <label htmlFor="inputChannel">Input channel</label><br/>
          <MidiChannelDropdown id="inputChannel" midiChannel={this.state.midi.channel} onChange={this.handleChannelChange}/>
          <MidiControllerDropdown id="inputController" controllerId="1" onChange={this.handleControllerChange}/>
        
        
        </p>
        <input type="submit" value="Save"/>
      </form>
    );
  }
});

/*
  groups[id] = {
    id: id,
    name: "Group " + id,
    keyboard: {
      // for keyboard split - start and end key on the keyboard
      start: 0,
      end: 60,
      shift: 0, // number of semitones to shift up/down

      // this allows multiple groups to be affected by these common controllers
      affectedByPitchBend: true, // midi pitch bend will still work independently of this setting
      affectedByModWheel: true,  // midi modulation will still work independently of this setting
      affectedByFootController: true  // midi foot controller will still work independently of this setting
    },
    midi: {
      channel: 0,
      controllerToInputMap: [], // what midi CCs are mapped to what input positions
      controllerHiRes: [] // what midi CCs are high res
    },
    graph: {
      //TODO: Add graph here
    },
    voices: [];      
  };*/

module.exports = VoiceGroupForm;