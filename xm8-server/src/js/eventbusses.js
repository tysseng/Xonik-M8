var events = require('events');

var busses = {
    controls: {
        input: new events.EventEmitter(),
        output: new events.EventEmitter()
    }
}

module.exports = busses;