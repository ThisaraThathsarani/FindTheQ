"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Station = require('../models/stationOwner.model');

var _require = require('express'),
    request = _require.request;

var bcrypt = require('bcryptjs');

var auth = require('../middlewares/token');

var registerStation = function registerStation(req, res) {
  var stationid, ownername, stationname, phonenumber, address, arrivaltime, finishtime, fueltype, pwd, salt, password, station, response;
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
          pwd = req.body.password;
          salt = bcrypt.genSaltSync(10);
          password = bcrypt.hashSync(pwd, salt);
          station = new Station({
            stationid: stationid,
            ownername: ownername,
            stationname: stationname,
            phonenumber: phonenumber,
            address: address,
            arrivaltime: arrivaltime,
            finishtime: finishtime,
            fueltype: fueltype,
            password: password
          });
          _context.prev = 12;
          _context.next = 15;
          return regeneratorRuntime.awrap(station.save());

        case 15:
          response = _context.sent;

          if (!response) {
            _context.next = 20;
            break;
          }

          return _context.abrupt("return", res.status(201).send({
            message: "New Station Registered to the Fuel System"
          }));

        case 20:
          return _context.abrupt("return", res.status(500).send({
            message: "Internal server error"
          }));

        case 21:
          _context.next = 27;
          break;

        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](12);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(400).send({
            message: "Error while registering the station to the application"
          }));

        case 27:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[12, 23]]);
};

var login = function login(req, res) {
  var ownername, password, station, token;
  return regeneratorRuntime.async(function login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          ownername = req.body.ownername;
          password = req.body.password;
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(Station.findOne({
            ownername: ownername
          }));

        case 5:
          station = _context2.sent;

          if (!station) {
            _context2.next = 15;
            break;
          }

          if (!(station && bcrypt.compareSync(password, station.password))) {
            _context2.next = 12;
            break;
          }

          token = auth.generateAccessToken(ownername);
          return _context2.abrupt("return", res.status(200).send(_objectSpread({}, ownername.toJSON(), {
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
};

var getAllStation = function getAllStation(req, res) {
  var stations;
  return regeneratorRuntime.async(function getAllStation$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Station.find());

        case 3:
          stations = _context3.sent;

          if (!stations) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", res.json(stations));

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

var getOneStation = function getOneStation(req, res) {
  var stationID, station;
  return regeneratorRuntime.async(function getOneStation$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          stationID = req.params.id;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(Station.findOne({
            stationID: stationID
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
};

var searchStation = function searchStation(req, res) {
  var value, station;
  return regeneratorRuntime.async(function searchStation$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          value = req.params.stationname.trim();
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Station.find());

        case 4:
          station = _context5.sent;

          if (!station) {
            _context5.next = 9;
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
};

var updateTime = function updateTime(req, res) {
  var stationid, station, ownername, stationname, address, phonenumber, changeTime, response;
  return regeneratorRuntime.async(function updateTime$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          stationid = req.params.stationid;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Station.findOne({
            stationid: stationid
          }));

        case 3:
          station = _context6.sent;
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
          _context6.prev = 9;
          _context6.next = 12;
          return regeneratorRuntime.awrap(Station.findOneAndUpdate({
            stationid: stationid
          }, changeTime));

        case 12:
          response = _context6.sent;

          if (!response) {
            _context6.next = 17;
            break;
          }

          return _context6.abrupt("return", res.status(200).send({
            message: 'Successfully updated'
          }));

        case 17:
          return _context6.abrupt("return", res.status(500).send({
            message: 'Internal server error'
          }));

        case 18:
          _context6.next = 23;
          break;

        case 20:
          _context6.prev = 20;
          _context6.t0 = _context6["catch"](9);
          return _context6.abrupt("return", res.status(400).send({
            message: 'Unable to update'
          }));

        case 23:
        case "end":
          return _context6.stop();
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
