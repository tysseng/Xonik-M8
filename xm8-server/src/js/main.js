var wsclient = require('./wsclient.js');
require('./knobWithRing.js');
require('./eventDebug.js');

console.log($("#receiveOn"));

$('#receiveOn').click(function() {
    var $this = $(this);
    // $this will contain a reference to the checkbox   
    wsclient.toggleReceive($this.is(':checked'));
});

console.log("Starting Xonik M8");
