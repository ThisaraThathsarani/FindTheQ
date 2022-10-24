"use strict";

var express = require('express');

var router = express.Router();

var customerController = require('../controllers/customer.controller');

router.post('/register', customerController.registerCustomer);
router.post('/login', customerController.login);
router.put('/:vehicleid', customerController.updateTime);
router.get('/:email', customerController.getOneUser);
router.put('/updateJoined/:email', customerController.updateCustomerJoinedStatus);
module.exports = router;
//# sourceMappingURL=customer.route.dev.js.map
