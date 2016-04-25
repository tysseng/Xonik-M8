// TODO: Move to shared and add hw ids

module.exports = [
  {id: 0, name: "-------", inputs: []},
  {id: 24, name: "Sum", inputs: []},
  {
    id: 1, 
    name: "Invert", 
    description: "Invert around 0",
    inputs: [{
      id: 0,
      name: "To invert",
      validator: function(value){},
      optional: false
    }]
  },
  {id: 2, name: "Invert each side", inputs: []},
  {id: 3, name: "Ramp", inputs: []},
  {id: 4, name: "Delay line", inputs: []},
  {id: 5, name: "Multiply", inputs: []},
  {id: 6, name: "Memory", inputs: []},
  {id: 7, name: "Lfo - pulse", inputs: []},
  {id: 8, name: "Switch", inputs: []},
  {id: 9, name: "Compare", inputs: []},
  {
    id: 10, 
    name: "Max",
    description: "Maximum of input 1 to input 8"
    inputs: [{
      id: 0,
      name: "Input 1",
      validator: function(value){},
      optional: false
    },
    {
      id: 1,
      name: "Input 2",
      validator: function(value){},
      optional: true
    },
    {
      id: 2,
      name: "Input 3",
      validator: function(value){},
      optional: true
    },
    {
      id: 3,
      name: "Input 4",
      validator: function(value){},
      optional: true
    },
    {
      id: 4,
      name: "Input 5",
      validator: function(value){},
      optional: true
    },
    {
      id: 5,
      name: "Input 6",
      validator: function(value){},
      optional: true
    },
    {
      id: 6,
      name: "Input 7",
      validator: function(value){},
      optional: true
    },
    {
      id: 7,
      name: "Input 8",
      validator: function(value){},
      optional: true
    }
    ]
  },
  {id: 11, name: "Min", inputs: []},
  {id: 12, name: "Scale", inputs: []},
  {id: 13, name: "Trigger", inputs: []},
  {id: 14, name: "Binary and", inputs: []},
  {id: 15, name: "Binary or", inputs: []},
  {id: 16, name: "Binary xor", inputs: []},
  {id: 17, name: "Binary not", inputs: []},
  {id: 18, name: "Buffer input", inputs: []},
  {id: 19, name: "Output", inputs: []}, 
  {id: 20, name: "Output tuned", inputs: []},
  {id: 21, name: "Glide", inputs: []},  
  {id: 22, name: "Quantize", inputs: []},  
  {id: 23, name: "Positive exponential", inputs: []}
];