const express = require('express');

const router = express.Router();

let stationController = require('../controllers/stationOwner.controller')

router.post('/register', stationController.registerStation);

router.get('/viewAllStation', stationController.getAllStation);
router.get('/viewOneStation/:stationID', stationController.getOneStation);
router.get('/searchStation/:stationname', stationController.searchStation);
router.get('/searchStation/:address', stationController.searchStationByAddress);
router.put('/:stationid', stationController.updateTime);

module.exports = router;

