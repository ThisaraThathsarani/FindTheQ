const Customer = require('../models/customer.model');
const { request } = require('express')
const bcrypt = require('bcryptjs');
const auth = require('../middlewares/token')

const registerCustomer = async (req, res) => {

    const customername = req.body.customername;
    const email = req.body.email;
    const vehicleid = req.body.vehicleid;
    const nic = req.body.nic;
    const phonenumber = req.body.phonenumber;
    const vehicletype = req.body.vehicletype;
    const pwd = req.body.password;

    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(pwd, salt);

    const customer = new Customer({
        customername,
        email,
        vehicleid,
        nic,
        phonenumber,
        vehicletype,
        password,
        isJoined : false
    })

    try{
        let response = await customer.save();
        if(response) {
            console.log("yes")
            return res.status(201).send({message: "New Customer Registered to the Fuel System"})
        }else {
            console.log("no")
            return res.status(500).send({message: "Internal server error"});
        }
    }catch (error) {
        console.log(error);
        return res.status(400).send({message: "Error while registering the customer to the application"})

    }

}

const updateCustomerJoinedStatus = async (req, res) => {

    const email = req.params.email;

    try {
        const response = await Customer.updateOne(
            {"email": email},
            {$set: {"isJoined": true }}
        )
        if(response){
            console.log("Ok")
            return res.status(200).send({ message: 'User Joined to the queue' })
        }
    } catch (err) {
        console.log("error while updating user>>")
        return res.status(500).send({ message: 'Internal server error' })
    }
}

const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const customer = await Customer.findOne({ email: email });
        if (customer) {
            if (customer && bcrypt.compareSync(password, customer.password)) {
                const token = auth.generateAccessToken(email);
                
                return res.status(200).send({ ...customer.toJSON(), token  });
            }
            else {
                return res.status(400).send({ message: 'Such user does not exist check your credentials' })
            }
        } else {
            return res.status(404).send({ message: 'Such user does not exist' });
        }
    } catch (err) {
        return res.status(400).send({ message: 'Such user does not exist check your credentials' })
    }

}

const updateTime = async (req, res) => {
    const vehicleid = req.params.vehicleid;

    const customer = await Customer.findOne({ vehicleid: vehicleid });

    const password = customer.password;

    const changeTime = {
        customername : req.body.customername,
        vehicleid : req.body.vehicleid,
        nic : req.body.nic,
        phonenumber : req.body.phonenumber,
        vehicletype : req.body.vehicletype,
        password : password
    }

    try {
        const response = await Customer.findOneAndUpdate({ vehicleid: vehicleid } , changeTime);
        if(response){
            return res.status(200).send({message: 'Successfully update time'})
        }else {

        return res.status(500).send({ message: 'Internal server error' });
        }

    } catch (err) {
        return res.status(400).send({ message: 'Unable to update' })
    }
}


const getOneUser = async (req, res) => {

    const email = req.params.email;

    try {
        let customer = await Customer.findOne({
            email: email 
        });
        if(customer) {
            return res.json(customer)
        }else {
            return res.status(404).send({ message: 'No such customer found' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}



module.exports = {
    registerCustomer,
    login,
    updateTime,
    getOneUser,
    updateCustomerJoinedStatus
}