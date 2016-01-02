/*

//TODO: 
- controllers must be 8 bit, transmitting > 255 will wrap! 
	- scale controllers
- Protect receive from transmit - send must wait for interrupt to go low
- Add client id instead of not resending event to gui to event to prevent resending message to same client
- Add support for multiple voices / indicate what voice cards to send messages to.

http://easyreactbook.com/blog/react-fundamentals-configuring-browserify-babelify-and-react

https://github.com/babel/babelify#options

browserify src/js/App.jsx -t [ babelify --presets [ es2015 react ] ] > static/js/xm8.js
NB: Space før siste ] er kritisk!


npm run build-js
npm run watch-js
*/
var ReactDOM = require('react-dom');
var wsclient = require('./wsclient.js');
require('./eventDebug.js');

var Knob = require('./components/Knob.jsx');

ReactDOM.render(
  <Knob controllerId="volume"/>,
  document.getElementById('content')
);

console.log("Starting Xonik M8");

$('#receiveOn').click(function() {
    var $this = $(this);
    // $this will contain a reference to the checkbox   
    wsclient.toggleReceive($this.is(':checked'));
});

