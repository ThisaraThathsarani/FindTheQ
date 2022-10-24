const FuelStation = require('../models/station.model');
const { request } = require('express')

const StationRegister = async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const ownername = req.body.ownername;
    const phonenumber = req.body.phonenumber;
    const address = req.body.address;
    const arrivaltime = req.body.arrivaltime;
    const finishtime = req.body.finishtime;
    const status = req.body.status;
    const stock = req.body.stock;
    const queue = req.body.queue;

    const fuelStation = new FuelStation({
        id,
        name,
        ownername,
        phonenumber,
        address,
        arrivaltime,
        finishtime,
        status,
        stock,
        queue
    })

    try {
        let response = await fuelStation.save();
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

const getAllFuelStation = async (req,res) =>{
    try {
        let fuelStations = await FuelStation.find();
        if(fuelStations) {
            return res.json(fuelStations)
        }else {
            return res.status(404).send({message: 'Error on retrieving station'})
        }
    }catch (err) {
        return res.status(500).send({ message: 'Internal server error' })
    }
}

const getOneFuelStation = async (req, res) => {
    const id = req.params.id;

    try {
        let station = await FuelStation.findOne({
            stationid: id 
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
    let value = req.params.name.trim();

    try {
        let station = await FuelStation.find();
        if(station) {
            FuelStation.find({ name: { $regex: "^" + value + ".*", $options: 'i' } }).then((stations) => {
                res.json(stations)
        
            })
        }else {
            return res.status(404).send({ message: 'No such station found' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

const searchByAddress = async (req, res) => {
    let value = req.params.address.trim();

    try {
        let station = await FuelStation.find();
        if(station) {
            FuelStation.find({ address: { $regex: "^" + value + ".*", $options: 'i' } }).then((stations) => {
                res.json(stations)
        
            })
        }else {
            return res.status(404).send({ message: 'No such station found' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

const updateStatus = async (req, res) => {
    const id = req.params.id;

    const fuelStation = await FuelStation.findOne({stationid : id});

    const name = fuelStation.name;
    const ownername = fuelStation.ownername;
    const phonenumber = fuelStation.phonenumber;
    const address = fuelStation.address;
    const arrivaltime = fuelStation.arrivaltime;
    const finishtime = fuelStation.finishtime;
    const stock = fuelStation.stock;
    const queue = fuelStation.queue;

    const changeStatus = {
        id : id,
        name : name,
        ownername : ownername,
        phonenumber : phonenumber,
        address : address,
        arrivaltime : arrivaltime,
        finishtime : finishtime,
        status : req.body.status,
        stock : stock,
        queue: queue,

    }

    try {
        const response = await FuelStation.findOneAndUpdate({ stationid: id } , changeStatus);
        if(response){
            return res.status(200).send({message: 'Successfully updated'})
        }else {

        return res.status(500).send({ message: 'Internal server error' });
        }

    } catch (err) {
        return res.status(400).send({ message: 'Unable to update' })
    }

}

const updatestock = async (req, res) => {
    const id = req.params.id;

    const fuelStation = await FuelStation.findOne({id : id});

    const name = fuelStation.name;
    const ownername = fuelStation.ownername;
    const phonenumber = fuelStation.phonenumber;
    const address = fuelStation.address;
    const arrivaltime = fuelStation.arrivaltime;
    const finishtime = fuelStation.finishtime;
    const status = fuelStation.status;
    const queue = fuelStation.queue;

    const changeStatus = {
        id : id,
        name : name,
        ownername : ownername,
        phonenumber : phonenumber,
        address : address,
        arrivaltime : arrivaltime,
        finishtime : finishtime,
        status : status,
        stock : req.body.stock,
        queue: queue,

    }

    try {
        const response = await FuelStation.findOneAndUpdate({ stationid: id } , changeStatus);
        if(response){
            return res.status(200).send({message: 'Successfully updated'})
        }else {

        return res.status(500).send({ message: 'Internal server error' });
        }

    } catch (err) {
        return res.status(400).send({ message: 'Unable to update' })
    }

}

const updatelength = async (req, res) => {
    const id = req.params.id;

    const fuelStation = await FuelStation.findOne({id : id});

    const name = fuelStation.name;
    const ownername = fuelStation.ownername;
    const phonenumber = fuelStation.phonenumber;
    const address = fuelStation.address;
    const arrivaltime = fuelStation.arrivaltime;
    const finishtime = fuelStation.finishtime;
    const status = fuelStation.status;
    const stock = fuelStation.stock;

    const changeStatus = {
        id : id,
        name : name,
        ownername : ownername,
        phonenumber : phonenumber,
        address : address,
        arrivaltime : arrivaltime,
        finishtime : finishtime,
        status : status,
        stock : stock,
        queue: req.body.queue,

    }

    try {
        const response = await FuelStation.findOneAndUpdate({ id: id } , changeStatus);
        if(response){
            return res.status(200).send({message: 'Successfully updated'})
        }else {

        return res.status(500).send({ message: 'Internal server error' });
        }

    } catch (err) {
        return res.status(400).send({ message: 'Unable to update' })
    }

}

const updateDetails = async (req, res) => {
    const id = req.params.id;

    const fuelStation = await FuelStation.findOne({id : id});

    const name = fuelStation.name;
    const ownername = fuelStation.ownername;
    const phonenumber = fuelStation.phonenumber;
    const address = fuelStation.address;
    const arrivaltime = fuelStation.arrivaltime;
    const finishtime = fuelStation.finishtime;
    const queue = fuelStation.queue;

    const changeStatus = {
        id : id,
        name : name,
        ownername : ownername,
        phonenumber : phonenumber,
        address : address,
        arrivaltime : arrivaltime,
        finishtime : finishtime,
        status : req.body.status,
        stock : req.body.stock,
        queue: queue,

    }

    try {
        const response = await FuelStation.findOneAndUpdate({ id: id } , changeStatus);
        if(response){
            return res.status(200).send({message: 'Successfully updated'})
        }else {

        return res.status(500).send({ message: 'Internal server error' });
        }

    } catch (err) {
        return res.status(400).send({ message: 'Unable to update' })
    }

}

const getcount = async (req, res) => {
    let value = req.params.id.trim();
    console.log("carcount");
    try {

        let fuealStationData = await FuelStation.findOne({id : value});

        if(fuealStationData){
           
            let carCount = fuealStationData.queue.Car;
            let vanCount = fuealStationData.queue.Van;
            let busCount = fuealStationData.queue.Bus;
            let bikeCount = fuealStationData.queue.Bike;
            let tukCount = fuealStationData.queue.Tuk;


            let allCount = carCount + vanCount + busCount + bikeCount + tukCount;
         
            // let countObject = {
            //     carCount : carCount,
            //     vanCount : vanCount,
            //     busCount : busCount,
            //     bikeCount : bikeCount,
            //     allCount : allCount
            // }

           return res.status(200).send({count : allCount});
           
        }else {
            return res.status(404).send({ message: 'No such vehicle type found' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

const getCarCount = async (req,res) => {
    let value = req.params.id.trim();
   
    try {

        let fuealStationData = await FuelStation.findOne({id : value});

        if(fuealStationData){
           
            let carCount = fuealStationData.queue.Car;

           return res.status(200).send({count : carCount});
           
        }else {
            return res.status(404).send({ message: 'No such vehicle type found' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

const getVanCount = async (req,res) => {
    let value = req.params.id.trim();
   
    try {

        let fuealStationData = await FuelStation.findOne({id : value});

        if(fuealStationData){
           
            let vanCount = fuealStationData.queue.Van;

           return res.status(200).send({count : vanCount});
           
        }else {
            return res.status(404).send({ message: 'No such vehicle type found' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

const getBusCount = async (req,res) => {
    let value = req.params.id.trim();
   
    try {

        let fuealStationData = await FuelStation.findOne({id : value});

        if(fuealStationData){
           
            let busCount = fuealStationData.queue.Bus;

           return res.status(200).send({count : busCount});
           
        }else {
            return res.status(404).send({ message: 'No such vehicle type found' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

const getBikeCount = async (req,res) => {
    let value = req.params.id.trim();
   
    try {

        let fuealStationData = await FuelStation.findOne({id : value});

        if(fuealStationData){
           
            let bikeCount = fuealStationData.queue.Bike;

           return res.status(200).send({count : bikeCount});
           
        }else {
            return res.status(404).send({ message: 'No such vehicle type found' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

const getTukCount = async (req,res) => {
    let value = req.params.id.trim();
   
    try {

        let fuealStationData = await FuelStation.findOne({id : value});

        if(fuealStationData){
           
            let tukCount = fuealStationData.queue.Tuk;

           return res.status(200).send({count : tukCount});
           
        }else {
            return res.status(404).send({ message: 'No such vehicle type found' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}


module.exports = {
    StationRegister,
    getAllFuelStation,
    getOneFuelStation,
    searchStation,
    searchByAddress,
    updateStatus,
    updatestock,
    updatelength,
    updateDetails,
    getcount,
    getCarCount,
    getVanCount,
    getBusCount,
    getBikeCount,
    getTukCount
    
}