"use strict";

var express = require('express');

var router = express.Router();

var stationController = require('../controllers/stationOwner.controller');

router.post('/register', stationController.registerStation);
router.post('/login', stationController.login);
router.get('/viewAllStation', stationController.getAllStation);
router.get('/viewOneStation/:stationID', stationController.getOneStation);
router.get('/searchStation/:stationname', stationController.searchStation);
router.put('/:stationid', stationController.updateTime);
module.exports = router;
//# sourceMappingURL=stationOwner.route.dev.js.map
