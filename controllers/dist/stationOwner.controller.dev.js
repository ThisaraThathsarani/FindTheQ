"use strict";

var Station = require('../models/stationOwner.model');

var _require = require('express'),
    request = _require.request;

var bcrypt = require('bcryptjs');

var auth = require('../middlewares/token');

var registerStation = function registerStation(req, res) {
  var stationid, ownername, stationname, phonenumber, address, arrivaltime, finishtime, fueltype, station, response;
  return regeneratorRuntime.async(function registerStation$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          stationid = req.body.stationid;
          ownername = req.body.ownername;
          stationname = req.body.stationname;
          phonenumber = req.body.phonenumber;
          address = req.body.address;
          arrivaltime = req.body.arrivaltime;
          finishtime = req.body.finishtime;
          fueltype = req.body.fueltype;
          station = new Station({
            stationid: stationid,
            ownername: ownername,
            stationname: stationname,
            phonenumber: phonenumber,
            address: address,
            arrivaltime: arrivaltime,
            finishtime: finishtime,
            fueltype: fueltype
          });
          _context.prev = 9;
          _context.next = 12;
          return regeneratorRuntime.awrap(station.save());

        case 12:
          response = _context.sent;

          if (!response) {
            _context.next = 17;
            break;
          }

          return _context.abrupt("return", res.status(201).send({
            message: "New Station Registered to the Fuel System"
          }));

        case 17:
          return _context.abrupt("return", res.status(500).send({
            message: "Internal server error"
          }));

        case 18:
          _context.next = 24;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](9);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(400).send({
            message: "Error while registering the station to the application"
          }));

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[9, 20]]);
};

var getAllStation = function getAllStation(req, res) {
  var stations;
  return regeneratorRuntime.async(function getAllStation$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Station.find());

        case 3:
          stations = _context2.sent;

          if (!stations) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", res.json(stations));

        case 8:
          return _context2.abrupt("return", res.status(404).send({
            message: 'Error on retrieving station'
          }));

        case 9:
          _context2.next = 14;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(500).send({
            message: 'Internal server error'
          }));

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

var getOneStation = function getOneStation(req, res) {
  var stationID, station;
  return regeneratorRuntime.async(function getOneStation$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          stationID = req.params.id;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Station.findOne({
            stationID: stationID
          }));

        case 4:
          station = _context3.sent;

          if (!station) {
            _context3.next = 9;
            break;
          }

          return _context3.abrupt("return", res.json(station));

        case 9:
          return _context3.abrupt("return", res.status(404).send({
            message: 'No such station found'
          }));

        case 10:
          _context3.next = 15;
          break;

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](1);
          return _context3.abrupt("return", res.status(500).send({
            message: 'Internal Server Error'
          }));

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 12]]);
};

var searchStation = function searchStation(req, res) {
  var value, station;
  return regeneratorRuntime.async(function searchStation$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          value = req.params.stationname.trim();
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(Station.find());

        case 4:
          station = _context4.sent;

          if (!station) {
            _context4.next = 9;
            break;
          }

          Station.find({
            stationname: {
              $regex: "^" + value + ".*",
              $options: 'i'
            }
          }).then(function (stations) {
            res.json(stations);
          });
          _context4.next = 10;
          break;

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
};

var updateTime = function updateTime(req, res) {
  var stationid, station, ownername, stationname, address, phonenumber, changeTime, response;
  return regeneratorRuntime.async(function updateTime$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          stationid = req.params.stationid;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Station.findOne({
            stationid: stationid
          }));

        case 3:
          station = _context5.sent;
          ownername = station.ownername;
          stationname = station.stationname;
          address = station.address;
          phonenumber = station.phonenumber;
          changeTime = {
            stationid: stationid,
            ownername: ownername,
            stationname: stationname,
            phonenumber: phonenumber,
            address: address,
            arrivaltime: req.body.arrivaltime,
            finishtime: req.body.finishtime,
            fueltype: req.body.fueltype
          };
          _context5.prev = 9;
          _context5.next = 12;
          return regeneratorRuntime.awrap(Station.findOneAndUpdate({
            stationid: stationid
          }, changeTime));

        case 12:
          response = _context5.sent;

          if (!response) {
            _context5.next = 17;
            break;
          }

          return _context5.abrupt("return", res.status(200).send({
            message: 'Successfully updated'
          }));

        case 17:
          return _context5.abrupt("return", res.status(500).send({
            message: 'Internal server error'
          }));

        case 18:
          _context5.next = 23;
          break;

        case 20:
          _context5.prev = 20;
          _context5.t0 = _context5["catch"](9);
          return _context5.abrupt("return", res.status(400).send({
            message: 'Unable to update'
          }));

        case 23:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[9, 20]]);
};

module.exports = {
  registerStation: registerStation,
  getAllStation: getAllStation,
  getOneStation: getOneStation,
  searchStation: searchStation,
  updateTime: updateTime,
  login: login
};
//# sourceMappingURL=stationOwner.controller.dev.js.map
