var SPI = require('spi');

var spi = new SPI.Spi('/dev/spidev0.0', {
    'mode': SPI.MODE['MODE_1'],  // always set mode as the first option
    'chipSelect': SPI.CS['none'] // 'none', 'high' - defaults to low
  }, function(s){s.open();});

var rxbuf = new Buffer([ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]);

var state = 0;

function writeToSpi(){
	var txbuf = new Buffer([ state ]);
	spi.transfer(txbuf, rxbuf, function(device, buf) {
	    console.log("Wrote " + state + " to SPI");

	    var s = "";
	    for (var i=0; i < buf.length; i++){}
	        s = s + buf[i] + " ";
        }
	    console.log(s + "- " + new Date().getTime());
	});	
	setTimeout(writeToSpi, 1000);
}

writeToSpi();