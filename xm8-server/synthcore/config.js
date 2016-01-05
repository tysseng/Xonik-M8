var config = {
	spi: {
		loopback: false,
		device: '/dev/spidev0.0',
		mode: 'MODE_1',     // clock idle low, clock phase active to idle.
		chipSelect: 'none', // 'none', 'high' - defaults to low
		maxSpeed: 8000000, 
		interruptPin: 3 
	}
}

module.exports = config;
