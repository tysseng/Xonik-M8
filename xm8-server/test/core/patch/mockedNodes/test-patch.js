/**
 * A patch that can be used for testing.
 * It has:
 * 1) A sum node that sums four inputs
 * - A constant, 12 semitones
 * - A constant, 1 volt
 * - A physical input (OSC 1 square)
 * - A virtual input ("A virtual input")
 *
 * 2) An invert node that links to the output of the sum node
 * 3) One normal output node that outputs the result of the invert node to VCO 1 pitch
 * 4) One output tuned node that outputs the result of the invert node to Filter 1 slope
 * 5) A matrix with one colliding output (Osc 1 square -> VCO 1 pitch)
 * 6) One non colliding output (Osc 1 saw -> VCO 2 pitch)
 * 7) One virtual input
 *   - linked to panel osc 1 square
 *   - outputs midi CC, 4 - foot controller and sends and receives hi-res midi.
 * 8) One virtual input without any link to midi or physical inputs
   */


export default {
  "contents": {
    "patch": {
      "graph": {
        "nodes": {
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
            "valid": true,
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
            "consumers": {/*
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
        },
        "outputs": {
          "0": {
            "nodeId": "2",
            "paramId": "1"
          },
          "5": {
            "nodeId": "3",
            "paramId": "1"
          }
        },
        "nextAvailableNodeId": 4
      },
      "matrix": {
        "directoutputs": {
          "0": "OSC_1_SQUARE",
          "1": "OSC_1_SAW"
        }
      },
      "virtualInputs": {
        "byId": {
          "virt|30": {
            "panelController": "OSC_1_SQUARE",
            "midi": {
              "status": 176,
              "data1": 4,
              "hires": true,
              "send": true,
              "receive": true
            },
            "max": "",
            "numberOfSteps": "",
            "stepGenerationMode": "CONTINOUS",
            "scale": "DAC_VALUE",
            "name": {
              "full": "A virtual input",
              "short": "A virtual"
            },
            "value": 0,
            "stepInterval": "",
            "min": "",
            "type": "VERTICAL_RANGE",
            "id": "virt|30",
            "options": {}
          },
          "virt|31": {
            "panelController": "VIRTUAL",
            "midi": {
              "status": "",
              "data1": "",
              "hires": false,
              "send": true,
              "receive": true
            },
            "max": "",
            "numberOfSteps": "",
            "stepGenerationMode": "CONTINOUS",
            "scale": "DAC_VALUE",
            "name": {
              "full": "Pure virtual",
              "short": "pure virtual"
            },
            "value": 0,
            "stepInterval": "",
            "min": "",
            "type": "VERTICAL_RANGE",
            "id": "virt|31",
            "options": {}
          }
        }
      },
      "inputgroups": {
        "groups": {
          "virtgroup|29": {
            "id": "virtgroup|29",
            "name": "New groupp",
            "isVisible": true,
            "elements": {
              "OSC_1_SAW": {
                "id": "OSC_1_SAW",
                "groupId": "virtgroup|29",
                "elementId": "OSC_1_SAW",
                "offset": {
                  "x": 17,
                  "y": 3
                },
                "type": ""
              },
              "OSC_1_SQUARE": {
                "id": "OSC_1_SQUARE",
                "groupId": "virtgroup|29",
                "elementId": "OSC_1_SQUARE",
                "offset": {
                  "x": 12,
                  "y": 3
                }
              }
            }
          }
        }
      }
    },
    "controllers": {
      "OSC_1_SAW": "18",
      "AMP_ENV_ATTACK": "26"
    }
  }
}