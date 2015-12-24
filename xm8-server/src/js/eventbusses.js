var EventBus = function(){};
EventBus.prototype.subscribe = function(event, fn) {
    $(this).bind(event, fn);
};
EventBus.prototype.publish = function(event) {
    $(this).trigger(event);
};

var busses = {
    controls: {
        input: new EventBus(),
        output: new EventBus()
    }
}

module.exports = busses;