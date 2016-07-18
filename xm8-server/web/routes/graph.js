var express = require('express');
var graphRepository = require('../../core/graph/graphRepository.js');
var router = express.Router();
var paramType = require('../../shared/graph/ParameterTypes.js').map;

// publish graph to voice cards
router.put('/publish', function(req, res){
  let result = graphRepository.sendGraph();
  if(result.updated){
    res.status(200).send(result.message);
  } else {
    res.status(500).send(result.message);
  }
});

// save graph as a patch
router.post('/save', function(req, res){  
  let result = graphRepository.save(req.body.name, req.body.folderId, req.body.fileId);

  // TODO: need try/catch here
  if(result.fileSaved){
    res.status(200).send('{}');
  } else {
    res.status(500).send(result.message);
  }
});

// load graph from a patch
router.post('/load', function(req, res){
  graphRepository.load(req.body.fileId, req.body.version);
  res.status(200).send('{}');
});

module.exports = router;
