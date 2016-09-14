export default {
  "0": {
    "id": "0",
    "name": "Node 0",
    "type": "1",
    "vis": {
      "x": 17,
      "y": 18
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
        "value": "1",
        "unit": "FRACTION",
        "valid": true
      }
    ]
  },
  "1": {
    "id": "1",
    "name": "Node 1",
    "type": "24",
    "vis": {
      "x": 112,
      "y": 20
    },
    "consumers": {},
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
      },
      {
        "id": "1",
        "type": "constant",
        "value": "2",
        "unit": "FRACTION",
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
  }
}