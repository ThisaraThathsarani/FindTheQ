"use strict";

var express = require('express');

var router = express.Router();

var fuelStationController = require('../controllers/station.controller');

router.post('/fuelStationRegister', fuelStationController.StationRegister);
router.get('/viewAllFuelStation', fuelStationController.getAllFuelStation);
router.get('/viewOneFuelStation/:id', fuelStationController.getOneFuelStation);
router.get('/searchStationByName/:name', fuelStationController.searchStation);
router.get('/searchStationByAddress/:address', fuelStationController.searchByAddress);
router.put('/updateStatus/:id', fuelStationController.updateStatus);
router.put('/updateStock/:id', fuelStationController.updatestock);
router.put('/updateQueue/:id', fuelStationController.updatelength);
router.put('/updateDetails/:id', fuelStationController.updateDetails);
router.get('/getCount/:id', fuelStationController.getcount);
router.get('/getCarCount/:id', fuelStationController.getCarCount);
router.get('/getVanCount/:id', fuelStationController.getVanCount);
router.get('/getBusCount/:id', fuelStationController.getBusCount);
router.get('/getBikeCount/:id', fuelStationController.getBikeCount);
router.get('/gettukeCount/:id', fuelStationController.getTukCount);
module.exports = router;
//# sourceMappingURL=station.route.dev.js.map
