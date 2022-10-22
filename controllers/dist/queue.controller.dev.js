"use strict";

var Queue = require('../models/queue.model');

var _require = require('express'),
    request = _require.request;

var registerQueue = function registerQueue(req, res) {
  var stationname, arrivaltime, leavetime, status, vehicleType, queue, response;
  return regeneratorRuntime.async(function registerQueue$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          stationname = req.body.stationname;
          arrivaltime = req.body.arrivaltime;
          leavetime = req.body.leavetime;
          status = req.body.status;
          vehicleType = req.body.vehicleType;
          queue = new Queue({
            stationname: stationname,
            arrivaltime: arrivaltime,
            leavetime: leavetime,
            status: status,
            vehicleType: vehicleType
          });
          _context.prev = 6;
          _context.next = 9;
          return regeneratorRuntime.awrap(queue.save());

        case 9:
          response = _context.sent;

          if (!response) {
            _context.next = 14;
            break;
          }

          return _context.abrupt("return", res.status(201).send({
            message: "New customer added to the queue"
          }));

        case 14:
          return _context.abrupt("return", res.status(500).send({
            message: "Internal server error"
          }));

        case 15:
          _context.next = 21;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](6);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(400).send({
            message: "Error while entering the queue"
          }));

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 17]]);
};

var updateTime = function updateTime(req, res) {
  var ID, changeTime, response;
  return regeneratorRuntime.async(function updateTime$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          ID = req.params.id;
          changeTime = {
            stationname: req.body.stationname,
            arrivaltime: req.body.arrivaltime,
            leavetime: req.body.leavetime,
            status: req.body.status,
            vehicleType: req.body.vehicleType
          };
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(Queue.findOneAndUpdate({
            ID: ID
          }, changeTime));

        case 5:
          response = _context2.sent;

          if (!response) {
            _context2.next = 10;
            break;
          }

          return _context2.abrupt("return", res.status(200).send({
            message: 'Successfully update time'
          }));

        case 10:
          return _context2.abrupt("return", res.status(500).send({
            message: 'Internal server error'
          }));

        case 11:
          _context2.next = 16;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](2);
          return _context2.abrupt("return", res.status(400).send({
            message: 'Unable to update'
          }));

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 13]]);
};

var deletequeue = function deletequeue(req, res) {
  var queueid, customer;
  return regeneratorRuntime.async(function deletequeue$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          queueid = req.params.queueid;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Queue.findOneAndDelete({
            queueid: queueid
          }));

        case 4:
          customer = _context3.sent;

          if (!customer) {
            _context3.next = 9;
            break;
          }

          return _context3.abrupt("return", res.status(204).send({
            message: 'Successfully deleted A User from queue'
          }));

        case 9:
          return _context3.abrupt("return", res.status(404).send({
            message: 'Such user does not remove the queue'
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

var getcount = function getcount(req, res) {
  var value, queue;
  return regeneratorRuntime.async(function getcount$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          value = req.params.vehicleType.trim();
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(Queue.find());

        case 4:
          queue = _context4.sent;

          if (!queue) {
            _context4.next = 9;
            break;
          }

          Queue.count({
            vehicleType: {
              $regex: "^" + value + ".*",
              $options: 'i'
            }
          }).then(function (queues) {
            res.json(queues);
          });
          _context4.next = 10;
          break;

        case 9:
          return _context4.abrupt("return", res.status(404).send({
            message: 'No such vehicle type found'
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

var getcountststus = function getcountststus(req, res) {
  var value, queue;
  return regeneratorRuntime.async(function getcountststus$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          value = req.params.status.trim();
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Queue.find());

        case 4:
          queue = _context5.sent;

          if (!queue) {
            _context5.next = 9;
            break;
          }

          Queue.count({
            status: {
              $regex: "^" + value + ".*",
              $options: 'i'
            }
          }).then(function (queues) {
            res.json(queues);
          });
          _context5.next = 10;
          break;

        case 9:
          return _context5.abrupt("return", res.status(404).send({
            message: 'No such user in the queue'
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

module.exports = {
  registerQueue: registerQueue,
  deletequeue: deletequeue,
  getcount: getcount,
  updateTime: updateTime,
  getcountststus: getcountststus
};
//# sourceMappingURL=queue.controller.dev.js.map
