//TODO: Make this into a single reusable eventbus definition instead of two or more duplications

var controllerInEventBus = {
    subscribe: function(event, fn) {
        $(this).bind(event, fn);
    },
    publish: function(event) {
        $(this).trigger(event);
    }
};

var controllerOutEventBus = {
    subscribe: function(event, fn) {
        $(this).bind(event, fn);
    },
    publish: function(event) {
        $(this).trigger(event);
    }
};

var busses = {
    controls: {
        input: controllerInEventBus,
        output: controllerOutEventBus
    }
}

module.exports = busses;