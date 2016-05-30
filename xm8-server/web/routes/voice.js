var express = require('express');
var router = express.Router();

// get all voices
router.put('/', function(req, res){
  
  res.status(200).send();
});

// get all voice groups
router.get('/group', function(req, res){
  
  res.status(200).send();
});

// get a specific voice group
router.get('/group/:groupid', function(req, res){
  
  res.status(200).send();
});

// add a voice to a voice group
router.put('/group/:groupid/:voiceid', function(req, res){
  
  res.status(200).send();
});

// remove a voice from a voice group
router.delete('/group/:groupid/:voiceid', function(req, res){
  
  //TODO Different return if not found?
  res.status(200).send();
});

// change voice group config
router.put('/group/:groupid/config', function(req, res){
  
  res.status(200).send();
});

// get voice group config
router.get('/group/:groupid/config', function(req, res){
  
  res.status(200).send();
});

module.exports = router;
