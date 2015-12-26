/*

//TODO: 
- controllers must be 8 bit, transmitting > 255 will wrap! 
	- scale controllers
	- support 16bit controller values.
- Protect receive from transmit - send must wait for interrupt to go low
*/

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
