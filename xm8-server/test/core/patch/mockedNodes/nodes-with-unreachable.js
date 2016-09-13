export default {
  "0": {
    "id": "0",
    "name": "Unreachable",
    "type": "1",
    "vis": {
      "x": 92,
      "y": 65
    },
    "consumers": {},
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
  "1": {
    "id": "1",
    "name": "Reachable",
    "type": "19",
    "vis": {
      "x": 187,
      "y": 65
    },
    "consumers": {},
    "valid": true,
    "params": [
      {
        "id": "0",
        "type": "constant",
        "value": "10",
        "unit": "FRACTION",
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
  "2": {
    "id": "2",
    "name": "Reachable 2",
    "type": "20",
    "vis": {
      "x": 190,
      "y": 150
    },
    "consumers": {},
    "valid": true,
    "params": [
      {
        "id": "0",
        "type": "constant",
        "value": "2",
        "unit": "FRACTION",
        "valid": true
      },
      {
        "id": "1",
        "type": "output",
        "value": "1",
        "unit": "",
        "valid": true
      }
    ]
  },
  "3": {
    "id": "3",
    "name": "Reachable 3",
    "type": "4",
    "vis": {
      "x": 190,
      "y": 232
    },
    "consumers": {},
    "valid": true,
    "params": [
      {
        "id": "0",
        "type": "result",
        "value": {
          "id": "4-3-0",
          "from": "4",
          "to": "3",
          "toParam": "0",
          "name": "",
          "showNameInGraph": true
        },
        "unit": "",
        "valid": true
      }
    ]
  },
  "4": {
    "id": "4",
    "name": "Reachable by link",
    "type": "1",
    "vis": {
      "x": 76,
      "y": 232
    },
    "consumers": {
      "4-3-0": {
        "id": "4-3-0",
        "from": "4",
        "to": "3",
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
  }
}