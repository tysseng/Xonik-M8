// TODO: Move to shared and add hw ids

module.exports = [
  {id: 0, name: "-------", parameters: []},
  {id: 24, name: "Sum", parameters: []},
  {
    id: 1, 
    name: "Invert", 
    description: "Invert around 0",
    parameters: [{
      id: 0,
      name: "To invert",
      validator: function(value){},
      optional: false
    }]
  },
  {id: 2, name: "Invert each side", parameters: []},
  {id: 3, name: "Ramp", parameters: []},
  {id: 4, name: "Delay line", parameters: []},
  {id: 5, name: "Multiply", parameters: []},
  {id: 6, name: "Memory", parameters: []},
  {id: 7, name: "Lfo - pulse", parameters: []},
  {id: 8, name: "Switch", parameters: []},
  {id: 9, name: "Compare", parameters: []},
  {
    id: 10, 
    name: "Max",
    description: "Maximum of parameter 1 to parameter 8",
    parameters: [{
      id: 0,
      name: "Parameter 1",
      validator: function(value){},
      optional: false
    },
    {
      id: 1,
      name: "Parameter 2",
      validator: function(value){},
      optional: true
    },
    {
      id: 2,
      name: "Parameter 3",
      validator: function(value){},
      optional: true
    },
    {
      id: 3,
      name: "Parameter 4",
      validator: function(value){},
      optional: true
    },
    {
      id: 4,
      name: "Parameter 5",
      validator: function(value){},
      optional: true
    },
    {
      id: 5,
      name: "Parameter 6",
      validator: function(value){},
      optional: true
    },
    {
      id: 6,
      name: "Parameter 7",
      validator: function(value){},
      optional: true
    },
    {
      id: 7,
      name: "Parameter 8",
      validator: function(value){},
      optional: true
    }
    ]
  },
  {id: 11, name: "Min", parameters: []},
  {id: 12, name: "Scale", parameters: []},
  {id: 13, name: "Trigger", parameters: []},
  {id: 14, name: "Binary and", parameters: []},
  {id: 15, name: "Binary or", parameters: []},
  {id: 16, name: "Binary xor", parameters: []},
  {id: 17, name: "Binary not", parameters: []},
  {id: 18, name: "Buffer parameter", parameters: []},
  {id: 19, name: "Output", parameters: []}, 
  {id: 20, name: "Output tuned", parameters: []},
  {id: 21, name: "Glide", parameters: []},  
  {id: 22, name: "Quantize", parameters: []},  
  {id: 23, name: "Positive exponential", parameters: []}
];