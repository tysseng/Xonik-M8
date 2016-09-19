export default {
  "0": {
    "id": "0",
    "name": "Output",
    "type": "19",
    "vis": {
      "x": 420,
      "y": 124
    },
    "consumers": {},
    "valid": true,
    "params": [
      {
        "id": "0",
        "type": "result",
        "value": {
          "id": "4-0-0",
          "from": "4",
          "to": "0",
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
  "1": {
    "id": "1",
    "name": "Independent 2",
    "type": "1",
    "vis": {
      "x": 107,
      "y": 168
    },
    "consumers": {
      "1-3-1": {
        "id": "1-3-1",
        "from": "1",
        "to": "3",
        "toParam": "1"
      }
    },
    "valid": true,
    "params": [
      {
        "id": "0",
        "type": "constant",
        "value": "2",
        "unit": "FRACTION",
        "valid": true
      }
    ]
  },
  "2": {
    "id": "2",
    "name": "Independent 1",
    "type": "1",
    "vis": {
      "x": 105,
      "y": 74
    },
    "consumers": {
      "2-3-0": {
        "id": "2-3-0",
        "from": "2",
        "to": "3",
        "toParam": "0"
      }
    },
    "valid": true,
    "params": [
      {
        "id": "0",
        "type": "constant",
        "value": "1",
        "unit": "FRACTION",
        "valid": true
      }
    ]
  },
  "3": {
    "id": "3",
    "name": "Summer",
    "type": "24",
    "vis": {
      "x": 197,
      "y": 120
    },
    "consumers": {
      "3-4-0": {
        "id": "3-4-0",
        "from": "3",
        "to": "4",
        "toParam": "0"
      }
    },
    "valid": true,
    "params": [
      {
        "id": "0",
        "type": "result",
        "value": {
          "id": "2-3-0",
          "from": "2",
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
        "type": "result",
        "value": {
          "id": "1-3-1",
          "from": "1",
          "to": "3",
          "toParam": "1",
          "name": "",
          "showNameInGraph": true
        },
        "unit": "",
        "valid": true
      },
      {
        "id": "2",
        "type": "",
        "value": "",
        "unit": "",
        "valid": true
      },
      {
        "id": "3",
        "type": "",
        "value": "",
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
  "4": {
    "id": "4",
    "name": "Summer 2",
    "type": "24",
    "vis": {
      "x": 313,
      "y": 153
    },
    "consumers": {
      "4-0-0": {
        "id": "4-0-0",
        "from": "4",
        "to": "0",
        "toParam": "0"
      }
    },
    "valid": true,
    "params": [
      {
        "id": "0",
        "type": "result",
        "value": {
          "id": "3-4-0",
          "from": "3",
          "to": "4",
          "toParam": "0",
          "name": "",
          "showNameInGraph": true
        },
        "unit": "",
        "valid": true
      },
      {
        "id": "1",
        "type": "result",
        "value": {
          "id": "5-4-1",
          "from": "5",
          "to": "4",
          "toParam": "1",
          "name": "",
          "showNameInGraph": true
        },
        "unit": "",
        "valid": true
      },
      {
        "id": "2",
        "type": "",
        "value": "",
        "unit": "",
        "valid": true
      },
      {
        "id": "3",
        "type": "",
        "value": "",
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
  "5": {
    "id": "5",
    "name": "Independent 3",
    "type": "1",
    "vis": {
      "x": 201,
      "y": 223
    },
    "consumers": {
      "5-4-1": {
        "id": "5-4-1",
        "from": "5",
        "to": "4",
        "toParam": "1"
      }
    },
    "valid": true,
    "params": [
      {
        "id": "0",
        "type": "constant",
        "value": "4",
        "unit": "FRACTION",
        "valid": true
      }
    ]
  }
}