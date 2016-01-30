var config = {
	spi: {
		loopback: false,
		device: '/dev/spidev0.0',
		mode: 'MODE_1',     // clock idle low, clock phase active to idle.
		chipSelect: 'none', // 'none', 'high' - defaults to low
		maxSpeed: 250000, 
		interruptPin: 3,
		minBufferSize: 16 
	},
	wifi: {
		adHoc: {
			ssid: "XM8",
			key: "abcdef123456",
			ip: "10.0.0.200",
			netmask: "255.255.255.0"
		}
	}
}

module.exports = config;
