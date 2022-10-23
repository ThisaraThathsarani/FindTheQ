"use strict";

var express = require('express');

var router = express.Router();

var fuelStationController = require('../controllers/station.controller');

router.post('/fuelStationRegister', fuelStationController.StationRegister);
router.get('/viewAllFuelStation', fuelStationController.getAllFuelStation);
router.get('/viewOneFuelStation/:stationid', fuelStationController.getOneFuelStation);
router.get('/searchStationByName/:stationname', fuelStationController.searchStation);
router.get('/searchStationByAddress/:address', fuelStationController.searchByAddress);
router.put('/updateStatus/:stationid', fuelStationController.updateStatus);
router.put('/updateStock/:stationid', fuelStationController.updatestock);
router.put('/updateQueue/:stationid', fuelStationController.updatelength);
router.put('/updateDetails/:stationid', fuelStationController.updateDetails);
router.get('/getCount/:stationid', fuelStationController.getcount);
router.get('/getCarCount/:stationid', fuelStationController.getCarCount);
router.get('/getVanCount/:stationid', fuelStationController.getVanCount);
router.get('/getBusCount/:stationid', fuelStationController.getBusCount);
router.get('/getBikeCount/:stationid', fuelStationController.getBikeCount);
module.exports = router;
//# sourceMappingURL=station.route.dev.js.map
