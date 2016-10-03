import _ from 'lodash';

const channelVoiceMessages = [
  {id: 0x80, name: "Note off"},
  {id: 0x90, name: "Note on"},
  {id: 0xA0, name: "Polyphonic key pressure"}, // aftertouch
  {id: 0xB0, name: "Control change", selected: true},
  {id: 0xC0, name: "Program change"},
  {id: 0xD0, name: "Channel pressure"}, // aftertouch
  {id: 0xE0, name: "Pitch bend"}
];

const systemCommonMessages = [
  {id: 0xF0, name: "Sysex start"},
  {id: 0xF1, name: "Time code quarter frame"},
  {id: 0xF2, name: "Song position"},
  {id: 0xF3, name: "Song select"},
  {id: 0xF6, name: "Tune request"},
  {id: 0xF7, name: "Sysex end"}
];

//NB: These may be interleaved with sysex!
const systemRealtimeMessages = [
  {id: 0xF0, name: "Timing clock"},
  {id: 0xF1, name: "Start"},
  {id: 0xF2, name: "Continue"},
  {id: 0xF3, name: "Stop"},
  {id: 0xF6, name: "Active sensing"},
  {id: 0xF7, name: "Reset"}
];

const midiStatusByNumber = {};

_.each(channelVoiceMessages, message => midiStatusByNumber[message.id] = message);
_.each(systemCommonMessages, message => midiStatusByNumber[message.id] = message);
_.each(systemRealtimeMessages, message => midiStatusByNumber[message.id] = message);

export {channelVoiceMessages, systemCommonMessages, systemRealtimeMessages, midiStatusByNumber};