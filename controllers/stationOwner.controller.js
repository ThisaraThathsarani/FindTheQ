const Station = require('../models/stationOwner.model');
const { request } = require('express')

const registerStation = async (req, res) => {

    const stationid = req.body.stationid;
    const ownername = req.body.ownername;
    const stationname = req.body.stationname;
    const address = req.body.address;
    const arrivaltime = req.body.arrivaltime;
    const finishtime = req.body.finishtime;
    const fueltype = req.body.fueltype;

    const station = new Station({
        stationid,
        ownername,
        stationname,
        address,
        arrivaltime,
        finishtime,
        fueltype
    })

    try{
        let response = await station.save();
        if(response) {
            return res.status(201).send({message: "New Station Registered to the Fuel System"})
        }else {
            return res.status(500).send({message: "Internal server error"});
        }
    }catch (error) {
        console.log(error);
        return res.status(400).send({message: "Error while registering the station to the application"})

    }

}

const getAllStation = async (req, res) => {
    try {
        let stations = await Station.find();
        if(stations) {
            return res.json(stations)
        }else {
            return res.status(404).send({message: 'Error on retrieving station'})
        }
    }catch (err) {
        return res.status(500).send({ message: 'Internal server error' })
    }
}

const getOneStation = async (req, res) => {

    const stationID = req.params.id

    try {
        let station = await Station.findOne({
           stationID: stationID 
        });
        if(station) {
            return res.json(station)
        }else {
            return res.status(404).send({ message: 'No such station found' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

const searchStation = async (req, res) => {
    let value = req.params.stationname.trim();

    try {
        let station = await Station.find();
        if(station) {
            Station.find({ stationname: { $regex: "^" + value + ".*", $options: 'i' } }).then((stations) => {
                res.json(stations)
        
            })
        }else {
            return res.status(404).send({ message: 'No such station found' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

const updateTime = async (req, res) => {
    const stationid = req.params.stationid;

    const station = await Station.findOne({ stationid: stationid });

    const ownername = station.ownername;
    const stationname = station.stationname;
    const address = station.address;


    const changeTime = {
    stationid : stationid,
    ownername : ownername,
    stationname : stationname,
    address : address,
    arrivaltime : req.body.arrivaltime,
    finishtime : req.body.finishtime,
    fueltype : req.body.fueltype,
    }

    try {
        const response = await Station.findOneAndUpdate({ stationid: stationid } , changeTime);
        if(response){
            return res.status(200).send({message: 'Successfully updated'})
        }else {

        return res.status(500).send({ message: 'Internal server error' });
        }

    } catch (err) {
        return res.status(400).send({ message: 'Unable to update' })
    }
}



module.exports = {
    registerStation,
    getAllStation,
    getOneStation,
    searchStation,
    updateTime
}