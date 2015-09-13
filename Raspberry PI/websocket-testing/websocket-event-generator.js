var util = require('util');
var EventEmitter = require('events').EventEmitter;

var EventGenerator = function() {

    // we need to store the reference of `this` to `self`, so that we can use the current context in the setTimeout (or any callback) functions
    // using `this` in the setTimeout functions will refer to those funtions, not the EventGenerator class
    var self = this;
    var i = 0;
    
    setInterval(function() {
        self.emit('someevent', i);
        console.log("event emitted");
        i++;
    }, 10);
    
    // EventEmitters inherit a single event listener, see it in action
    this.on('newListener', function(listener) {
        console.log('Event listener registered: ' + listener);
    });
    
};

// extend the EventEmitter class using our class
util.inherits(EventGenerator, EventEmitter);

module.exports = EventGenerator;