"use strict";

var express = require('express');

var router = express.Router();

var customerController = require('../controllers/customer.controller');

router.post('/register', customerController.registerCustomer);
router.post('/login', customerController.login);
router.put('/:vehicleid', customerController.updateTime);
router.get('/:customername', customerController.getOneUser);
router.put('/updateJoined/:nic', customerController.updateCustomerJoinedStatus);
module.exports = router;
//# sourceMappingURL=customer.route.dev.js.map
