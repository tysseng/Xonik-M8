import express from 'express';
import { save, load, sendPatch } from '../../core/patch/patchRepository.js';
var router = express.Router();

// publish patch to voice cards
router.put('/publish', function(req, res){
  let result = sendPatch();
  if(result.updated){
    res.status(200).send(result.message);
  } else {
    res.status(500).send(result.message);
  }
});

// save graph as a patch
router.post('/save', function(req, res){
  let result = save({
    patchNumber: req.body.customData.patchNumber,
    filename: req.body.filename,
    folderId: req.body.folderId
  });

  // TODO: need try/catch here
  if(result.fileSaved){
    res.status(200).send('{}');
  } else {
    res.status(500).send(result.message);
  }
});

// load graph from a patch
router.post('/load', function(req, res){
  load({
    patchNumber: req.body.customData.patchNumber,
    filename: req.body.filename,
    folderId: req.body.folderId,
    fileId: req.body.fileId,
    version: req.body.version
  });
  res.status(200).send('{}');
});

module.exports = router;
