/*

//TODO: 
- controllers must be 8 bit, transmitting > 255 will wrap! 
	- scale controllers
- Protect receive from transmit - send must wait for interrupt to go low
- Add client id instead of not resending event to gui to event to prevent resending message to same client
- Add support for multiple voices / indicate what voice cards to send messages to.
- Do not resend events to the clients they came from (or only update gui on server returns, flux style)
- get server address from node
BUGS:
- knobs snap back to 1 when they listen to themselves.
- Release outside of window = hanging, no release ever
Docs:

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
  <div class="none">
  	<Knob controllerId="volume"/>
	<Knob controllerId="frequency"/>
  </div>
  ,
  document.getElementById('content')
);

console.log("Starting Xonik M8");

$('#receiveOn').click(function() {
    var $this = $(this);
    // $this will contain a reference to the checkbox   
    wsclient.toggleReceive($this.is(':checked'));
});

