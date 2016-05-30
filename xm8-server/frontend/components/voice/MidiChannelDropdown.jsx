var React = require('react');

var MidiChannelDropdown = React.createClass({

  handleChannelChange: function(e){
    this.props.onChange(this.refs.midiChannel.value);
  },

  render: function(){
    return (
      <div>
      <select id="{this.props.id}" value={this.props.channel} ref="midiChannel" onChange={this.handleChannelChange}>
        <option value="0">1</option>
        <option value="1">2</option>          
        <option value="2">3</option> 
        <option value="3">4</option> 
        <option value="4">5</option>
        <option value="5">6</option>          
        <option value="6">7</option> 
        <option value="7">8</option> 
        <option value="8">9</option>
        <option value="9">10</option>          
        <option value="10">11</option> 
        <option value="11">12</option> 
        <option value="12">13</option>
        <option value="13">14</option>          
        <option value="14">15</option> 
        <option value="15">16</option> 
      </select>
      </div>
    );
  }
});

module.exports = MidiChannelDropdown;