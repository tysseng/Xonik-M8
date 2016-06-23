var express = require('express');
var matrixRepository = require('../../core/matrix/matrixRepository.js');
var router = express.Router();
var paramType = require('../../shared/matrix/ParameterTypes.js').map;

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
router.post('/save', function(req, res){  
  let result = matrixRepository.save(req.body.name, req.body.folderId, req.body.fileId);

  // TODO: need try/catch here
  if(result.fileSaved){
    res.status(200).send('{}');
  } else {
    res.status(500).send(result.message);
  }
});

// load matrix from a patch
router.post('/load', function(req, res){
  matrixRepository.load(req.body.fileId, req.body.version);
  res.status(200).send('{}');
});

module.exports = router;
