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
  matrix: {
    numberOfInputs: 64
  },
  wifi: {
    adapter: "wlan0",
    fallback: "accessPoint",
    // increase these if connection to network fails and you want to let wpa supplicant
    // try for a longer duration before we abort it.
    connectionRetry: {
      max: 16,
      delayMs: 250
    },
    adHoc: {
      ssid: "XM8",
      key: "abcdef123456",
      ip: "10.0.0.200",
      netmask: "255.255.255.0",
      fakeDomain: "xm8.net"
    },
    accessPoint: {
      ssid: "XM8",
      key: "abcdef123456",
      ip: "10.0.0.200",
      netmask: "255.255.255.0",
      fakeDomain: "xm8.net",
      channel: 1      
    },
    dhcp: {
      range: '10.0.0.50,10.0.0.199,12h'
    },
    files: {
      persistedNets: 'persistentStorage/persisted_nets.json',
      wpaSupplicant: '/etc/wpa_supplicant/wpa_supplicant.conf',
      wpaLog: '/tmp/wpa_supplicant.log',
      hostapdConf: '/etc/hostapd/hostapd.conf',
      dnsmasqConf: '/etc/dnsmasq.conf'
    }    
  }
}

module.exports = config;
