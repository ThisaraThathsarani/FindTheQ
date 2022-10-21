const express = require('express');

const router = express.Router();

let customerController = require('../controllers/customer.controller')

router.post('/register', customerController.registerCustomer);
router.post('/login', customerController.login);

router.put('/:nic', customerController.updateTime);
router.get('/:customername', customerController.getOneUser);

module.exports = router;