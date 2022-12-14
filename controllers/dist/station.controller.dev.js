"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FuelStation = require('../models/station.model');

var _require = require('express'),
    request = _require.request;

var bcrypt = require('bcryptjs');

var auth = require('../middlewares/token'); //Station registration


var StationRegister = function StationRegister(req, res) {
  var id, name, ownername, phonenumber, address, arrivaltime, finishtime, status, stock, queue, pwd, salt, password, fuelStation, response;
  return regeneratorRuntime.async(function StationRegister$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = req.body.id;
          name = req.body.name;
          ownername = req.body.ownername;
          phonenumber = req.body.phonenumber;
          address = req.body.address;
          arrivaltime = req.body.arrivaltime;
          finishtime = req.body.finishtime;
          status = req.body.status;
          stock = req.body.stock;
          queue = req.body.queue;
          pwd = req.body.password;
          salt = bcrypt.genSaltSync(10);
          password = bcrypt.hashSync(pwd, salt);
          fuelStation = new FuelStation({
            id: id,
            name: name,
            ownername: ownername,
            phonenumber: phonenumber,
            address: address,
            arrivaltime: "-",
            finishtime: "-",
            status: "Available",
            stock: {
              diesel: 0,
              petrol: 0
            },
            queue: {
              Car: 0,
              Van: 0,
              Bus: 0,
              Bike: 0,
              Tuk: 0
            },
            password: password
          });
          _context.prev = 14;
          _context.next = 17;
          return regeneratorRuntime.awrap(fuelStation.save());

        case 17:
          response = _context.sent;

          if (!response) {
            _context.next = 22;
            break;
          }

          return _context.abrupt("return", res.status(201).send({
            message: "New Station Registered to the Fuel System"
          }));

        case 22:
          return _context.abrupt("return", res.status(500).send({
            message: "Internal server error"
          }));

        case 23:
          _context.next = 29;
          break;

        case 25:
          _context.prev = 25;
          _context.t0 = _context["catch"](14);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(400).send({
            message: "Error while registering the station to the application"
          }));

        case 29:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[14, 25]]);
}; //station owner login


var login = function login(req, res) {
  var id, password, fuelStation, token;
  return regeneratorRuntime.async(function login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.body.id;
          password = req.body.password;
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(FuelStation.findOne({
            id: id
          }));

        case 5:
          fuelStation = _context2.sent;

          if (!fuelStation) {
            _context2.next = 15;
            break;
          }

          if (!(fuelStation && bcrypt.compareSync(password, fuelStation.password))) {
            _context2.next = 12;
            break;
          }

          token = auth.generateAccessToken(id);
          return _context2.abrupt("return", res.status(200).send(_objectSpread({}, fuelStation.toJSON(), {
            token: token
          })));

        case 12:
          return _context2.abrupt("return", res.status(400).send({
            message: 'Such user does not exist check your credentials'
          }));

        case 13:
          _context2.next = 16;
          break;

        case 15:
          return _context2.abrupt("return", res.status(404).send({
            message: 'Such user does not exist'
          }));

        case 16:
          _context2.next = 21;
          break;

        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](2);
          return _context2.abrupt("return", res.status(400).send({
            message: 'Such user does not exist check your credentials'
          }));

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 18]]);
}; //get all fuel station


var getAllFuelStation = function getAllFuelStation(req, res) {
  var fuelStations;
  return regeneratorRuntime.async(function getAllFuelStation$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(FuelStation.find());

        case 3:
          fuelStations = _context3.sent;

          if (!fuelStations) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", res.json(fuelStations));

        case 8:
          return _context3.abrupt("return", res.status(404).send({
            message: 'Error on retrieving station'
          }));

        case 9:
          _context3.next = 14;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", res.status(500).send({
            message: 'Internal server error'
          }));

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

var getOneFuelStation = function getOneFuelStation(req, res) {
  var id, station;
  return regeneratorRuntime.async(function getOneFuelStation$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(FuelStation.findOne({
            id: id
          }));

        case 4:
          station = _context4.sent;

          if (!station) {
            _context4.next = 9;
            break;
          }

          return _context4.abrupt("return", res.json(station));

        case 9:
          return _context4.abrupt("return", res.status(404).send({
            message: 'No such station found'
          }));

        case 10:
          _context4.next = 15;
          break;

        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](1);
          return _context4.abrupt("return", res.status(500).send({
            message: 'Internal Server Error'
          }));

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 12]]);
}; //search station by name


var searchStation = function searchStation(req, res) {
  var value, station;
  return regeneratorRuntime.async(function searchStation$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          value = req.params.name.trim();
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(FuelStation.find());

        case 4:
          station = _context5.sent;

          if (!station) {
            _context5.next = 9;
            break;
          }

          FuelStation.find({
            name: {
              $regex: "^" + value + ".*",
              $options: 'i'
            }
          }).then(function (stations) {
            res.json(stations);
          });
          _context5.next = 10;
          break;

        case 9:
          return _context5.abrupt("return", res.status(404).send({
            message: 'No such station found'
          }));

        case 10:
          _context5.next = 15;
          break;

        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](1);
          return _context5.abrupt("return", res.status(500).send({
            message: 'Internal Server Error'
          }));

        case 15:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 12]]);
}; //search station by address


var searchByAddress = function searchByAddress(req, res) {
  var value, station;
  return regeneratorRuntime.async(function searchByAddress$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          value = req.params.address.trim();
          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(FuelStation.find());

        case 4:
          station = _context6.sent;

          if (!station) {
            _context6.next = 9;
            break;
          }

          FuelStation.find({
            address: {
              $regex: "^" + value + ".*",
              $options: 'i'
            }
          }).then(function (stations) {
            res.json(stations);
          });
          _context6.next = 10;
          break;

        case 9:
          return _context6.abrupt("return", res.status(404).send({
            message: 'No such station found'
          }));

        case 10:
          _context6.next = 15;
          break;

        case 12:
          _context6.prev = 12;
          _context6.t0 = _context6["catch"](1);
          return _context6.abrupt("return", res.status(500).send({
            message: 'Internal Server Error'
          }));

        case 15:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 12]]);
}; //update status by station id


var updateStatus = function updateStatus(req, res) {
  var id, fuelStation, password, name, ownername, phonenumber, address, arrivaltime, finishtime, stock, queue, changeStatus, response;
  return regeneratorRuntime.async(function updateStatus$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          id = req.params.id;
          _context7.next = 3;
          return regeneratorRuntime.awrap(FuelStation.findOne({
            stationid: id
          }));

        case 3:
          fuelStation = _context7.sent;
          password = fuelStation.password;
          name = fuelStation.name;
          ownername = fuelStation.ownername;
          phonenumber = fuelStation.phonenumber;
          address = fuelStation.address;
          arrivaltime = fuelStation.arrivaltime;
          finishtime = fuelStation.finishtime;
          stock = fuelStation.stock;
          queue = fuelStation.queue;
          changeStatus = {
            id: id,
            name: name,
            ownername: ownername,
            phonenumber: phonenumber,
            address: address,
            arrivaltime: arrivaltime,
            finishtime: finishtime,
            status: req.params.status,
            stock: stock,
            queue: queue,
            password: password
          };
          _context7.prev = 14;
          _context7.next = 17;
          return regeneratorRuntime.awrap(FuelStation.findOneAndUpdate({
            stationid: id
          }, changeStatus));

        case 17:
          response = _context7.sent;

          if (!response) {
            _context7.next = 22;
            break;
          }

          return _context7.abrupt("return", res.status(200).send({
            message: 'Successfully updated'
          }));

        case 22:
          return _context7.abrupt("return", res.status(500).send({
            message: 'Internal server error'
          }));

        case 23:
          _context7.next = 28;
          break;

        case 25:
          _context7.prev = 25;
          _context7.t0 = _context7["catch"](14);
          return _context7.abrupt("return", res.status(400).send({
            message: 'Unable to update'
          }));

        case 28:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[14, 25]]);
}; //update stock details


var updatestock = function updatestock(req, res) {
  var id, fuelStation, password, name, ownername, phonenumber, address, arrivaltime, finishtime, status, queue, changeStatus, response;
  return regeneratorRuntime.async(function updatestock$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          id = req.params.id;
          _context8.next = 3;
          return regeneratorRuntime.awrap(FuelStation.findOne({
            id: id
          }));

        case 3:
          fuelStation = _context8.sent;
          password = fuelStation.password;
          name = fuelStation.name;
          ownername = fuelStation.ownername;
          phonenumber = fuelStation.phonenumber;
          address = fuelStation.address;
          arrivaltime = fuelStation.arrivaltime;
          finishtime = fuelStation.finishtime;
          status = fuelStation.status;
          queue = fuelStation.queue;
          changeStatus = {
            id: id,
            name: name,
            ownername: ownername,
            phonenumber: phonenumber,
            address: address,
            arrivaltime: arrivaltime,
            finishtime: finishtime,
            status: status,
            stock: {
              diesel: req.body.diesel,
              petrol: req.body.petrol
            },
            queue: queue,
            password: password
          };
          _context8.prev = 14;
          _context8.next = 17;
          return regeneratorRuntime.awrap(FuelStation.findOneAndUpdate({
            stationid: id
          }, changeStatus));

        case 17:
          response = _context8.sent;

          if (!response) {
            _context8.next = 22;
            break;
          }

          return _context8.abrupt("return", res.status(200).send({
            message: 'Successfully updated'
          }));

        case 22:
          return _context8.abrupt("return", res.status(500).send({
            message: 'Internal server error'
          }));

        case 23:
          _context8.next = 28;
          break;

        case 25:
          _context8.prev = 25;
          _context8.t0 = _context8["catch"](14);
          return _context8.abrupt("return", res.status(400).send({
            message: 'Unable to update'
          }));

        case 28:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[14, 25]]);
}; //update queue length


var updatelength = function updatelength(req, res) {
  var id, fuelStation, password, name, ownername, phonenumber, address, arrivaltime, finishtime, status, stock, changeStatus, response;
  return regeneratorRuntime.async(function updatelength$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          id = req.params.id;
          _context9.next = 3;
          return regeneratorRuntime.awrap(FuelStation.findOne({
            id: id
          }));

        case 3:
          fuelStation = _context9.sent;
          password = fuelStation.password;
          name = fuelStation.name;
          ownername = fuelStation.ownername;
          phonenumber = fuelStation.phonenumber;
          address = fuelStation.address;
          arrivaltime = fuelStation.arrivaltime;
          finishtime = fuelStation.finishtime;
          status = fuelStation.status;
          stock = fuelStation.stock;
          changeStatus = {
            id: id,
            name: name,
            ownername: ownername,
            phonenumber: phonenumber,
            address: address,
            arrivaltime: arrivaltime,
            finishtime: finishtime,
            status: status,
            stock: stock,
            queue: {
              Car: req.body.queue.car,
              Van: req.body.queue.van,
              Bus: req.body.queue.bus,
              Bike: req.body.queue.bike,
              Tuk: req.body.queue.tuk
            },
            password: password
          };
          _context9.prev = 14;
          _context9.next = 17;
          return regeneratorRuntime.awrap(FuelStation.findOneAndUpdate({
            id: id
          }, changeStatus));

        case 17:
          response = _context9.sent;

          if (!response) {
            _context9.next = 22;
            break;
          }

          return _context9.abrupt("return", res.status(200).send({
            message: 'Successfully updated'
          }));

        case 22:
          return _context9.abrupt("return", res.status(500).send({
            message: 'Internal server error'
          }));

        case 23:
          _context9.next = 28;
          break;

        case 25:
          _context9.prev = 25;
          _context9.t0 = _context9["catch"](14);
          return _context9.abrupt("return", res.status(400).send({
            message: 'Unable to update'
          }));

        case 28:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[14, 25]]);
}; //update stock time time 


var updateStockTime = function updateStockTime(req, res) {
  var id, fuelStation, password, name, ownername, phonenumber, address, status, stock, queue, changeStatus, response;
  return regeneratorRuntime.async(function updateStockTime$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          id = req.params.id;
          _context10.next = 3;
          return regeneratorRuntime.awrap(FuelStation.findOne({
            id: id
          }));

        case 3:
          fuelStation = _context10.sent;
          password = fuelStation.password;
          name = fuelStation.name;
          ownername = fuelStation.ownername;
          phonenumber = fuelStation.phonenumber;
          address = fuelStation.address;
          status = fuelStation.status;
          stock = fuelStation.stock;
          queue = fuelStation.queue;
          changeStatus = {
            id: id,
            name: name,
            ownername: ownername,
            phonenumber: phonenumber,
            address: address,
            arrivaltime: req.body.arrivaltime,
            finishtime: req.body.finishtime,
            status: status,
            stock: stock,
            queue: queue,
            password: password
          };
          _context10.prev = 13;
          _context10.next = 16;
          return regeneratorRuntime.awrap(FuelStation.findOneAndUpdate({
            id: id
          }, changeStatus));

        case 16:
          response = _context10.sent;

          if (!response) {
            _context10.next = 21;
            break;
          }

          return _context10.abrupt("return", res.status(200).send({
            message: 'Successfully updated'
          }));

        case 21:
          return _context10.abrupt("return", res.status(500).send({
            message: 'Internal server error'
          }));

        case 22:
          _context10.next = 27;
          break;

        case 24:
          _context10.prev = 24;
          _context10.t0 = _context10["catch"](13);
          return _context10.abrupt("return", res.status(400).send({
            message: 'Unable to update'
          }));

        case 27:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[13, 24]]);
}; //update station details


var updateDetails = function updateDetails(req, res) {
  var id, fuelStation, password, name, ownername, phonenumber, address, arrivaltime, finishtime, queue, changeStatus, response;
  return regeneratorRuntime.async(function updateDetails$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          id = req.params.id;
          _context11.next = 3;
          return regeneratorRuntime.awrap(FuelStation.findOne({
            id: id
          }));

        case 3:
          fuelStation = _context11.sent;
          password = fuelStation.password;
          name = fuelStation.name;
          ownername = fuelStation.ownername;
          phonenumber = fuelStation.phonenumber;
          address = fuelStation.address;
          arrivaltime = fuelStation.arrivaltime;
          finishtime = fuelStation.finishtime;
          queue = fuelStation.queue;
          changeStatus = {
            id: id,
            name: name,
            ownername: ownername,
            phonenumber: phonenumber,
            address: address,
            arrivaltime: arrivaltime,
            finishtime: finishtime,
            status: req.body.status,
            stock: req.body.stock,
            queue: queue,
            password: password
          };
          _context11.prev = 13;
          _context11.next = 16;
          return regeneratorRuntime.awrap(FuelStation.findOneAndUpdate({
            id: id
          }, changeStatus));

        case 16:
          response = _context11.sent;

          if (!response) {
            _context11.next = 21;
            break;
          }

          return _context11.abrupt("return", res.status(200).send({
            message: 'Successfully updated'
          }));

        case 21:
          return _context11.abrupt("return", res.status(500).send({
            message: 'Internal server error'
          }));

        case 22:
          _context11.next = 27;
          break;

        case 24:
          _context11.prev = 24;
          _context11.t0 = _context11["catch"](13);
          return _context11.abrupt("return", res.status(400).send({
            message: 'Unable to update'
          }));

        case 27:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[13, 24]]);
}; //get vehicle count


var getcount = function getcount(req, res) {
  var value, fuealStationData, carCount, vanCount, busCount, bikeCount, tukCount, allCount;
  return regeneratorRuntime.async(function getcount$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          value = req.params.id.trim();
          console.log("carcount");
          _context12.prev = 2;
          _context12.next = 5;
          return regeneratorRuntime.awrap(FuelStation.findOne({
            id: value
          }));

        case 5:
          fuealStationData = _context12.sent;

          if (!fuealStationData) {
            _context12.next = 16;
            break;
          }

          carCount = fuealStationData.queue.Car;
          vanCount = fuealStationData.queue.Van;
          busCount = fuealStationData.queue.Bus;
          bikeCount = fuealStationData.queue.Bike;
          tukCount = fuealStationData.queue.Tuk;
          allCount = carCount + vanCount + busCount + bikeCount + tukCount;
          return _context12.abrupt("return", res.status(200).send({
            count: allCount
          }));

        case 16:
          return _context12.abrupt("return", res.status(404).send({
            message: 'No such vehicle type found'
          }));

        case 17:
          _context12.next = 22;
          break;

        case 19:
          _context12.prev = 19;
          _context12.t0 = _context12["catch"](2);
          return _context12.abrupt("return", res.status(500).send({
            message: 'Internal Server Error'
          }));

        case 22:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[2, 19]]);
}; //get Car count


var getCarCount = function getCarCount(req, res) {
  var value, fuealStationData, carCount;
  return regeneratorRuntime.async(function getCarCount$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          value = req.params.id.trim();
          _context13.prev = 1;
          _context13.next = 4;
          return regeneratorRuntime.awrap(FuelStation.findOne({
            id: value
          }));

        case 4:
          fuealStationData = _context13.sent;

          if (!fuealStationData) {
            _context13.next = 10;
            break;
          }

          carCount = fuealStationData.queue.Car;
          return _context13.abrupt("return", res.status(200).send({
            count: carCount
          }));

        case 10:
          return _context13.abrupt("return", res.status(404).send({
            message: 'No such vehicle type found'
          }));

        case 11:
          _context13.next = 16;
          break;

        case 13:
          _context13.prev = 13;
          _context13.t0 = _context13["catch"](1);
          return _context13.abrupt("return", res.status(500).send({
            message: 'Internal Server Error'
          }));

        case 16:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[1, 13]]);
}; //get Van count


var getVanCount = function getVanCount(req, res) {
  var value, fuealStationData, vanCount;
  return regeneratorRuntime.async(function getVanCount$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          value = req.params.id.trim();
          _context14.prev = 1;
          _context14.next = 4;
          return regeneratorRuntime.awrap(FuelStation.findOne({
            id: value
          }));

        case 4:
          fuealStationData = _context14.sent;

          if (!fuealStationData) {
            _context14.next = 10;
            break;
          }

          vanCount = fuealStationData.queue.Van;
          return _context14.abrupt("return", res.status(200).send({
            count: vanCount
          }));

        case 10:
          return _context14.abrupt("return", res.status(404).send({
            message: 'No such vehicle type found'
          }));

        case 11:
          _context14.next = 16;
          break;

        case 13:
          _context14.prev = 13;
          _context14.t0 = _context14["catch"](1);
          return _context14.abrupt("return", res.status(500).send({
            message: 'Internal Server Error'
          }));

        case 16:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[1, 13]]);
}; //get bus count


var getBusCount = function getBusCount(req, res) {
  var value, fuealStationData, busCount;
  return regeneratorRuntime.async(function getBusCount$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          value = req.params.id.trim();
          _context15.prev = 1;
          _context15.next = 4;
          return regeneratorRuntime.awrap(FuelStation.findOne({
            id: value
          }));

        case 4:
          fuealStationData = _context15.sent;

          if (!fuealStationData) {
            _context15.next = 10;
            break;
          }

          busCount = fuealStationData.queue.Bus;
          return _context15.abrupt("return", res.status(200).send({
            count: busCount
          }));

        case 10:
          return _context15.abrupt("return", res.status(404).send({
            message: 'No such vehicle type found'
          }));

        case 11:
          _context15.next = 16;
          break;

        case 13:
          _context15.prev = 13;
          _context15.t0 = _context15["catch"](1);
          return _context15.abrupt("return", res.status(500).send({
            message: 'Internal Server Error'
          }));

        case 16:
        case "end":
          return _context15.stop();
      }
    }
  }, null, null, [[1, 13]]);
}; //get bike count


var getBikeCount = function getBikeCount(req, res) {
  var value, fuealStationData, bikeCount;
  return regeneratorRuntime.async(function getBikeCount$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          value = req.params.id.trim();
          _context16.prev = 1;
          _context16.next = 4;
          return regeneratorRuntime.awrap(FuelStation.findOne({
            id: value
          }));

        case 4:
          fuealStationData = _context16.sent;

          if (!fuealStationData) {
            _context16.next = 10;
            break;
          }

          bikeCount = fuealStationData.queue.Bike;
          return _context16.abrupt("return", res.status(200).send({
            count: bikeCount
          }));

        case 10:
          return _context16.abrupt("return", res.status(404).send({
            message: 'No such vehicle type found'
          }));

        case 11:
          _context16.next = 16;
          break;

        case 13:
          _context16.prev = 13;
          _context16.t0 = _context16["catch"](1);
          return _context16.abrupt("return", res.status(500).send({
            message: 'Internal Server Error'
          }));

        case 16:
        case "end":
          return _context16.stop();
      }
    }
  }, null, null, [[1, 13]]);
}; //get tuke count


var getTukCount = function getTukCount(req, res) {
  var value, fuealStationData, tukCount;
  return regeneratorRuntime.async(function getTukCount$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          value = req.params.id.trim();
          _context17.prev = 1;
          _context17.next = 4;
          return regeneratorRuntime.awrap(FuelStation.findOne({
            id: value
          }));

        case 4:
          fuealStationData = _context17.sent;

          if (!fuealStationData) {
            _context17.next = 10;
            break;
          }

          tukCount = fuealStationData.queue.Tuk;
          return _context17.abrupt("return", res.status(200).send({
            count: tukCount
          }));

        case 10:
          return _context17.abrupt("return", res.status(404).send({
            message: 'No such vehicle type found'
          }));

        case 11:
          _context17.next = 16;
          break;

        case 13:
          _context17.prev = 13;
          _context17.t0 = _context17["catch"](1);
          return _context17.abrupt("return", res.status(500).send({
            message: 'Internal Server Error'
          }));

        case 16:
        case "end":
          return _context17.stop();
      }
    }
  }, null, null, [[1, 13]]);
};

module.exports = {
  StationRegister: StationRegister,
  getAllFuelStation: getAllFuelStation,
  getOneFuelStation: getOneFuelStation,
  searchStation: searchStation,
  searchByAddress: searchByAddress,
  updateStatus: updateStatus,
  updatestock: updatestock,
  updatelength: updatelength,
  updateDetails: updateDetails,
  getcount: getcount,
  getCarCount: getCarCount,
  getVanCount: getVanCount,
  getBusCount: getBusCount,
  getBikeCount: getBikeCount,
  getTukCount: getTukCount,
  login: login,
  updateStockTime: updateStockTime
};
//# sourceMappingURL=station.controller.dev.js.map
