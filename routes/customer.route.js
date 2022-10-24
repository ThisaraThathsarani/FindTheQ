const express = require('express');

const router = express.Router();

let customerController = require('../controllers/customer.controller')

router.post('/register', customerController.registerCustomer);
router.post('/login', customerController.login);

router.put('/:vehicleid', customerController.updateTime);
router.get('/:customername', customerController.getOneUser);
router.put('/updateJoined/:nic', customerController.updateCustomerJoinedStatus);

module.exports = router;