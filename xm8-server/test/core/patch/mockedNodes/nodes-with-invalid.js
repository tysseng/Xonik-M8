export default {
  "0": {
    "id": "0",
    "name": "Node 0",
    "type": "24",
    "vis": {
      "x": 162,
      "y": 200
    },
    "consumers": {
      "0-1-0": {
        "id": "0-1-0",
        "from": "0",
        "to": "1",
        "toParam": "0"
      }
    },
    "valid": false,
    "params": [
      {
        "id": "0",
        "type": "constant",
        "value": "12",
        "unit": "SEMITONES",
        "valid": true
      },
      {
        "id": "1",
        "type": "constant",
        "value": "2",
        "unit": "VOLTS",
        "valid": true
      },
      {
        "id": "2",
        "type": "input",
        "value": "OSC_1_SQUARE",
        "unit": "",
        "valid": true
      },
      {
        "id": "3",
        "type": "virtualinput",
        "value": "virt|30",
        "unit": "",
        "valid": true
      },
      {
        "id": "4",
        "type": "",
        "value": "",
        "unit": "",
        "valid": true
      },
      {
        "id": "5",
        "type": "",
        "value": "",
        "unit": "",
        "valid": true
      },
      {
        "id": "6",
        "type": "",
        "value": "",
        "unit": "",
        "valid": true
      },
      {
        "id": "7",
        "type": "",
        "value": "",
        "unit": "",
        "valid": true
      }
    ]
  },
  "1": {
    "id": "1",
    "name": "Node 1",
    "type": "1",
    "vis": {
      "x": 278,
      "y": 203
    },
    "consumers": {
      "1-2-0": {
        "id": "1-2-0",
        "from": "1",
        "to": "2",
        "toParam": "0"
      },
      "1-3-0": {
        "id": "1-3-0",
        "from": "1",
        "to": "3",
        "toParam": "0"
      }
    },
    "valid": true,
    "params": [
      {
        "id": "0",
        "type": "result",
        "value": {
          "id": "0-1-0",
          "from": "0",
          "to": "1",
          "toParam": "0",
          "name": "",
          "showNameInGraph": true
        },
        "unit": "",
        "valid": true
      }
    ]
  },
  "2": {
    "id": "2",
    "name": "Node 2",
    "type": "19",
    "vis": {
      "x": 413,
      "y": 166
    },
    "consumers": {
      /*
       "2-3-0": {
       "id": "2-3-0",
       "from": "2",
       "to": "3",
       "toParam": "0"
       }             */
    },
    "valid": true,
    "params": [
      {
        "id": "0",
        "type": "result",
        "value": {
          "id": "1-2-0",
          "from": "1",
          "to": "2",
          "toParam": "0",
          "name": "",
          "showNameInGraph": true
        },
        "unit": "",
        "valid": true
      },
      {
        "id": "1",
        "type": "output",
        "value": "0",
        "unit": "",
        "valid": true
      }
    ]
  },
  "3": {
    "id": "3",
    "name": "Node 3",
    "type": "20",
    "vis": {
      "x": 415,
      "y": 260
    },
    "consumers": {},
    "valid": true,
    "params": [
      {
        "id": "0",
        "type": "result",
        "value": {
          "id": "1-3-0",
          "from": "1",
          "to": "3",
          "toParam": "0",
          "name": "",
          "showNameInGraph": true
        },
        "unit": "",
        "valid": true
      },
      {
        "id": "1",
        "type": "output",
        "value": "5",
        "unit": "",
        "valid": true
      }
    ]
  }
}