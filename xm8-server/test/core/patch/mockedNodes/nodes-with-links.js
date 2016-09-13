export default {
  "0": {
    "id": "0",
    "name": "Node 0",
    "type": "1",
    "vis": {
      "x": 53,
      "y": 92
    },
    "consumers": {
      "0-1-0": {
        "id": "0-1-0",
        "from": "0",
        "to": "1",
        "toParam": "0"
      }
    },
    "valid": true,
    "params": [
      {
        "id": "0",
        "type": "constant",
        "value": "3",
        "unit": "FRACTION",
        "valid": true
      }
    ]
  },
  "1": {
    "id": "1",
    "name": "Node 1",
    "type": "1",
    "vis": {
      "x": 190,
      "y": 91
    },
    "consumers": {
      "1-2-0": {
        "id": "1-2-0",
        "from": "1",
        "to": "2",
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
      "x": 316,
      "y": 88
    },
    "consumers": {},
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
  }
}