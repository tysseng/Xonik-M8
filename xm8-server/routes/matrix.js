var express = require('express');
var matrix = require('../core/matrix/matrix.js');
var router = express.Router();

router.get('/', function(req, res){

  res.status(200).send(matrix.nodes);  
});

router.put('/node/:id', function(req, res){

  // map to a usable matrix node:
  matrix.add({
    name: "Node 1",
    type: {name: "LFO"}
        })

  matrix.add(req.body);
  res.status(200).send(matrix.nodes);
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
