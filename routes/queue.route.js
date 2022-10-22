const express = require('express');

const router = express.Router();

let queueController = require('../controllers/queue.controller')

router.post('/addedtoqueue', queueController.registerQueue);
router.delete('/deletefromqueue/:queueid', queueController.deletequeue);
router.get('/vehiclecount/:vehicleType', queueController.getcount);
router.get('/vehiclecount/:status', queueController.getcountststus);
router.put('/:id', queueController.updateTime);

module.exports = router;