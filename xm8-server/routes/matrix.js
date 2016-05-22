var express = require('express');
var matrixRepository = require('../core/matrix/matrixRepository.js');
var router = express.Router();
var paramType = require('../shared/matrix/ParameterTypes.js').map;

// publish matrix to voice cards
router.put('/publish', function(req, res){
  let result = matrixRepository.sendMatrix();
  if(result.updated){
    res.status(200).send(result.message);
  } else {
    res.status(500).send(result.message);
  }
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
  res.status(200).send();
});


module.exports = router;
