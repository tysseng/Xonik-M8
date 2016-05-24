var config = {
  frontend: {
    //serverAddr: 'ws://10.0.1.123:8001',
    serverAddr: 'ws://localhost:8001',
    endpoints: {
      controllers: '/controller',
      state: '/state'
    }
  },  
  spi: {
    mockSpi: true,
    slaveReadEnabled: true,
    loopback: false,
    device: '/dev/spidev0.0',
    mode: 'MODE_1',     // clock idle low, clock phase active to idle.
    chipSelect: 'none', // 'none', 'high' - defaults to low
    //100k works fine
    //200k seems to work too
    //250k makes pic32 fail at times
    //1000000 fails all the time
    maxSpeed: 200000, 
    interruptPin: 22,
    minBufferSize: 16 
  },
  matrix: {
    numberOfInputs: 64
  },
  voices: {
    numberOfVoices: 8,
    numberOfGroups: 8
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
