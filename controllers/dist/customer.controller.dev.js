"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Customer = require('../models/customer.model');

var _require = require('express'),
    request = _require.request;

var bcrypt = require('bcryptjs');

var auth = require('../middlewares/token');

var registerCustomer = function registerCustomer(req, res) {
  var customername, nic, phonenumber, vehicletype, arrivaltime, departtime, fueltype, pwd, salt, password, customer, response;
  return regeneratorRuntime.async(function registerCustomer$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          customername = req.body.customername;
          nic = req.body.nic;
          phonenumber = req.body.phonenumber;
          vehicletype = req.body.vehicletype;
          arrivaltime = req.body.arrivaltime;
          departtime = req.body.departtime;
          fueltype = req.body.fueltype;
          pwd = req.body.password;
          salt = bcrypt.genSaltSync(10);
          password = bcrypt.hashSync(pwd, salt);
          customer = new Customer({
            customername: customername,
            nic: nic,
            phonenumber: phonenumber,
            vehicletype: vehicletype,
            arrivaltime: arrivaltime,
            departtime: departtime,
            fueltype: fueltype,
            password: password
          });
          _context.prev = 11;
          _context.next = 14;
          return regeneratorRuntime.awrap(customer.save());

        case 14:
          response = _context.sent;

          if (!response) {
            _context.next = 20;
            break;
          }

          console.log("yes");
          return _context.abrupt("return", res.status(201).send({
            message: "New Customer Registered to the Fuel System"
          }));

        case 20:
          console.log("no");
          return _context.abrupt("return", res.status(500).send({
            message: "Internal server error"
          }));

        case 22:
          _context.next = 28;
          break;

        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](11);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(400).send({
            message: "Error while registering the customer to the application"
          }));

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[11, 24]]);
};

var login = function login(req, res) {
  var customername, password, customer, token;
  return regeneratorRuntime.async(function login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          customername = req.body.customername;
          password = req.body.password;
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(Customer.findOne({
            customername: customername
          }));

        case 5:
          customer = _context2.sent;

          if (!customer) {
            _context2.next = 15;
            break;
          }

          if (!(customer && bcrypt.compareSync(password, customer.password))) {
            _context2.next = 12;
            break;
          }

          token = auth.generateAccessToken(customername);
          return _context2.abrupt("return", res.status(200).send(_objectSpread({}, customer.toJSON(), {
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

var updateTime = function updateTime(req, res) {
  var nic, customer, password, changeTime, response;
  return regeneratorRuntime.async(function updateTime$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          nic = req.params.nic;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Customer.findOne({
            nic: nic
          }));

        case 3:
          customer = _context3.sent;
          password = customer.password;
          changeTime = {
            customername: req.body.customername,
            nic: req.body.nic,
            phonenumber: req.body.phonenumber,
            vehicletype: req.body.vehicletype,
            arrivaltime: req.body.arrivaltime,
            departtime: req.body.departtime,
            fueltype: req.body.fueltype,
            password: password
          };
          _context3.prev = 6;
          _context3.next = 9;
          return regeneratorRuntime.awrap(Customer.findOneAndUpdate({
            nic: nic
          }, changeTime));

        case 9:
          response = _context3.sent;

          if (!response) {
            _context3.next = 14;
            break;
          }

          return _context3.abrupt("return", res.status(200).send({
            message: 'Successfully update time'
          }));

        case 14:
          return _context3.abrupt("return", res.status(500).send({
            message: 'Internal server error'
          }));

        case 15:
          _context3.next = 20;
          break;

        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](6);
          return _context3.abrupt("return", res.status(400).send({
            message: 'Unable to update'
          }));

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[6, 17]]);
};

var getOneUser = function getOneUser(req, res) {
  var customername, customer;
  return regeneratorRuntime.async(function getOneUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          customername = req.params.customername;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(Customer.findOne({
            customername: customername
          }));

        case 4:
          customer = _context4.sent;

          if (!customer) {
            _context4.next = 9;
            break;
          }

          return _context4.abrupt("return", res.json(customer));

        case 9:
          return _context4.abrupt("return", res.status(404).send({
            message: 'No such customer found'
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

module.exports = {
  registerCustomer: registerCustomer,
  login: login,
  updateTime: updateTime,
  getOneUser: getOneUser
};
//# sourceMappingURL=customer.controller.dev.js.map
