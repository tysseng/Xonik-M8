// SPI example, transmits a counter value every 100ms. Works with the PIC32MX slave code.

// using node-spi from https://github.com/RussTheAerialist/node-spi

/**
Om SPI MODES:

Man setter to ting. 
Clock polarity - når er clock idle og når er den aktiv. Normalt er aktiv 0.
Clock phase - når klokkes data. - Active to idle eller idle to active. Når data klokkes (falling or rising edge) er da avhengig av clock polarity - eks:

Hvis Clock idle low vil klokking på active to idle gi klokking på fallende edge (1 -> 0)
Hvis Clock idle high vil klokking på active to idle gi klokking på stigende edge (0 -> 1)

CPHA=0 er idle to active
CPHA=1 er active to idle.

De fire mulige modes er da:
0: 	CPOL = 0, CPHA = 0, Clock idle low, data is clocked in on rising edge, output data (change) on falling edge
1: 	CPOL = 0, CPHA = 1, Clock idle low, data is clocked in on falling edge, output data (change) on rising edge
2: 	CPOL = 1, CPHA = 0, Clock idle high, data is clocked in on falling edge, output data (change) on rising edge
3: 	CPOL = 1, CPHA = 1, Clock idle high, data is clocked in on rising, edge output data (change) on falling edge

Her betyr 
- "data is clocked" det øyeblikket data leses inn/ut av MISO/MOSI-pinnen. Det er dette active-to-idle refererer til.
- "output data (change)" det tidspunktet der en ny bit hentes fra bufferet og settes på i/o-pinnene på master/slave.

NB: På PIC18F så heter Active-to-idle "_SPI_HIGH_2_LOW" men fungerer på samme måte, altså endrer hva som er "high" seg avhengig av CPOL.

Les mer her: https://en.wikipedia.org/wiki/Serial_Peripheral_Interface_Bus
*/

var SPI = require('spi');

var spi = new SPI.Spi('/dev/spidev0.0', {
    'mode': SPI.MODE['MODE_1'],   // clock idle low, clock phase active to idle.
    'chipSelect': SPI.CS['none'], // 'none', 'high' - defaults to low
    'maxSpeed': 8000000
  }, function(s){s.open();});

var rxbuf = new Buffer([ 0x00 ]);

var state = 0;

function writeToSpi(){
    var txbuf = new Buffer([ state ]);
    spi.transfer(txbuf, rxbuf, function(device, buf) {
        console.log("Wrote " + state + " to SPI");
        console.log("Received " + buf[0] + " from slave");
    });

    state++;
    setTimeout(writeToSpi, 100);
}

writeToSpi();
