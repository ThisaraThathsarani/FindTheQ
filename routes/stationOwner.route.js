const express = require('express');

const router = express.Router();

let stationController = require('../controllers/stationOwner.controller')

router.post('/register', stationController.registerStation);
router.post('/login', stationController.login);

router.get('/viewAllStation', stationController.getAllStation);
router.get('/viewOneStation/:stationID', stationController.getOneStation);
router.get('/searchStation/:stationname', stationController.searchStation);
router.put('/:stationid', stationController.updateTime);

module.exports = router;