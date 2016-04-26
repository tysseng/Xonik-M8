var express = require('express');
var matrix = require('../core/matrix/matrix.js');
var router = express.Router();
var paramType = require('../shared/matrix/ParameterTypes.js').map;

//POST = create
//PUT = update
router.get('/', function(req, res){

  res.status(200).send(matrix.nodes);  
});

// Create a new node
router.post('/node', function(req, res){

  var node = matrix.add(req.body);
  res.status(201).send(node);
});

// Change an existing node
router.put('/node/:id', function(req, res){

  // map to a usable matrix node:
  var node = matrix.update(req.body);
  res.status(200).send(node);
});


router.delete('/node/:id', function(req, res){
  matrix.deleteById(req.params.id);
  
  //TODO Different return if not found?
  res.status(200).send(matrix.nodes);
});

router.put('/link/:id', function(req, res){
  matrix.linkById(req.body);
  res.status(200).send(matrix.nodes);
});


router.delete('/link/:id', function(req, res){
  matrix.deleteById(req.params.id);
  
  //TODO Different return if not found?
  res.status(200).send(matrix.nodes);
});

// publish matrix to voice cards
router.put('/publish', function(req, res){
  matrixRepository.sendMatrix();
  res.status(200).send(matrix.nodes);
});

// save matrix as a patch
router.put('/save', function(req, res){
  matrixRepository.save();
  res.status(200).send();
});

// save matrix as a patch
router.put('/load', function(req, res){
  // TODO - IMPLEMENT!
  matrixRepository.load();
  res.status(200).send(matrix.nodes);
});


module.exports = router;
