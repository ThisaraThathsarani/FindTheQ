const Queue = require('../models/queue.model');
const { request } = require('express')

const registerQueue = async (req, res) => {

    const stationname = req.body.stationname;
    const arrivaltime = req.body.arrivaltime;
    const leavetime = req.body.leavetime;
    const status = req.body.status;
    const vehicleType = req.body.vehicleType;


    const queue = new Queue({
        stationname,
        arrivaltime,
        leavetime,
        status,
        vehicleType

    })

    try{
        let response = await queue.save();
        if(response) {
            return res.status(201).send({message: "New customer added to the queue"})
        }else {
            return res.status(500).send({message: "Internal server error"});
        }
    }catch (error) {
        console.log(error);
        return res.status(400).send({message: "Error while entering the queue"})

    }

}

const updateTime = async (req, res) => {
    const ID = req.params.id;

    const changeTime = {
        stationname : req.body.stationname,
        arrivaltime : req.body.arrivaltime,
        leavetime : req.body.leavetime,
        status : req.body.status,
        vehicleType : req.body.vehicleType,
    }

    try {
        const response = await Queue.findOneAndUpdate({ ID: ID } , changeTime);
        if(response){
            return res.status(200).send({message: 'Successfully update time'})
        }else {

        return res.status(500).send({ message: 'Internal server error' });
        }

    } catch (err) {
        return res.status(400).send({ message: 'Unable to update' })
    }
}

const deletequeue = async (req, res) => {
    const queueid = req.params.queueid;

    try {
        const customer = await Queue.findOneAndDelete({ queueid:queueid });
        if(customer){

         return res.status(204).send({ message: 'Successfully deleted A User from queue' });
        } else {
            return res.status(404).send({ message: 'Such user does not remove the queue' });
        }

    } catch (err) {
        return res.status(500).send({ message: 'Internal Server Error' })
    }

}

const getcount = async (req, res) => {
    let value = req.params.vehicleType.trim();

    try {
        let queue = await Queue.find();
        if(queue){
            Queue.count({vehicleType: {$regex: "^" + value + ".*", $options: 'i' } }).then((queues) => {
                res.json(queues)
        
            })
        }else {
            return res.status(404).send({ message: 'No such vehicle type found' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

const getcountststus = async (req, res) => {
    let value = req.params.status.trim();

    try {
        let queue = await Queue.find();
        if(queue){
            Queue.count({status: {$regex: "^" + value + ".*", $options: 'i' } }).then((queues) => {
                res.json(queues)
        
            })
        }else {
            return res.status(404).send({ message: 'No such user in the queue' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}


module.exports = {
    registerQueue,
    deletequeue,
    getcount,
    updateTime,
    getcountststus
}