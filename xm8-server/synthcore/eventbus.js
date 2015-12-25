var events = require('events');

var busses = {
    controls: new events.EventEmitter()
}

module.exports = busses;