const express = require('express');

const router = express.Router();

let customerController = require('../controllers/customer.controller')

//customer registration
router.post('/register', customerController.registerCustomer);

//customer login
router.post('/login', customerController.login);

//get user by email
router.get('/:email', customerController.getOneUser);

//update joined satatus by email
router.put('/updateJoined/:email', customerController.updateCustomerJoinedStatus);

//set status by email
router.put('/setStatus/:email', customerController.setStatus);


router.post('/joinedstatus', customerController.setQueueJoinedStatus);
module.exports = router;