var config = {
	spi: {
		loopback: true,
		device: '/dev/spidev0.0',
		mode: 'MODE_1',     // clock idle low, clock phase active to idle.
		chipSelect: 'none', // 'none', 'high' - defaults to low
		maxSpeed: 8000000, 
		interruptPin: 7 
	}
}

module.exports = config;