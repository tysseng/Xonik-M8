export default {
  "0": {
  "id": "0",
    "name": "Node 0",
    "type": "24",
    "vis": {
    "x": 109,
      "y": 28
  },
  "consumers": {
    "0-2-0": {
      "id": "0-2-0",
        "from": "0",
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
        "id": "1-0-0",
        "from": "1",
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
      "type": "constant",
      "value": "3",
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
},
  "1": {
  "id": "1",
    "name": "Node 1",
    "type": "24",
    "vis": {
    "x": 27,
      "y": 27
  },
  "consumers": {
    "1-0-0": {
      "id": "1-0-0",
        "from": "1",
        "to": "0",
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
},
  "2": {
  "id": "2",
    "name": "Node 2",
    "type": "19",
    "vis": {
    "x": 195,
      "y": 27
  },
  "consumers": {},
  "valid": true,
    "params": [
    {
      "id": "0",
      "type": "result",
      "value": {
        "id": "0-2-0",
        "from": "0",
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