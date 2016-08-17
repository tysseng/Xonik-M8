import { getNextUniqueId } from '../../core/persistence/fileRepo';
import express from 'express';
let router = express.Router();

router.get('/next', function(req, res){
  res.status(200).send(getNextUniqueId());
});

module.exports = router;
