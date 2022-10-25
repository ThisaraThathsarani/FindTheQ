const express = require('express');

const router = express.Router();

let customerController = require('../controllers/customer.controller')

router.post('/register', customerController.registerCustomer);
router.post('/login', customerController.login);

router.put('/:vehicleid', customerController.updateTime);
router.get('/:email', customerController.getOneUser);
router.put('/updateJoined/:email', customerController.updateCustomerJoinedStatus);
router.put('/setStatus/:email', customerController.setStatus);

module.exports = router;