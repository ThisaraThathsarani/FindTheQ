const FuelStation = require('../models/station.model');
const { request } = require('express')
const bcrypt = require('bcryptjs');
const auth = require('../middlewares/token')

//Station registration
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
    const pwd = req.body.password;

    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(pwd, salt);

    const fuelStation = new FuelStation({
        id,
        name,
        ownername,
        phonenumber,
        address,
        arrivaltime: "-",
        finishtime: "-",
        status: "Available",
        stock: { diesel: 0, petrol: 0 },
        queue: { Car: 0, Van: 0, Bus: 0, Bike: 0, Tuk: 0 },
        password
    })

    try {
        let response = await fuelStation.save();
        if (response) {
            return res.status(201).send({ message: "New Station Registered to the Fuel System" })
        } else {
            return res.status(500).send({ message: "Internal server error" });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: "Error while registering the station to the application" })

    }

}

//station owner login
const login = async (req, res) => {
    const id = req.body.id;
    const password = req.body.password;

    try {
        const fuelStation = await FuelStation.findOne({ id: id });
        if (fuelStation) {
            if (fuelStation && bcrypt.compareSync(password, fuelStation.password)) {
                const token = auth.generateAccessToken(id);

                return res.status(200).send({ ...fuelStation.toJSON(), token });
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

//get all fuel station
const getAllFuelStation = async (req, res) => {
    try {
        let fuelStations = await FuelStation.find();
        if (fuelStations) {
            return res.json(fuelStations)
        } else {
            return res.status(404).send({ message: 'Error on retrieving station' })
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal server error' })
    }
}

const getOneFuelStation = async (req, res) => {
    const id = req.params.id;

    try {
        let station = await FuelStation.findOne({
            id: id
        });
        if (station) {
            return res.json(station)
        } else {
            return res.status(404).send({ message: 'No such station found' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

//search station by name
const searchStation = async (req, res) => {
    let value = req.params.name.trim();

    try {
        let station = await FuelStation.find();
        if (station) {
            FuelStation.find({ name: { $regex: "^" + value + ".*", $options: 'i' } }).then((stations) => {
                res.json(stations)

            })
        } else {
            return res.status(404).send({ message: 'No such station found' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

//search station by address
const searchByAddress = async (req, res) => {
    let value = req.params.address.trim();

    try {
        let station = await FuelStation.find();
        if (station) {
            FuelStation.find({ address: { $regex: "^" + value + ".*", $options: 'i' } }).then((stations) => {
                res.json(stations)

            })
        } else {
            return res.status(404).send({ message: 'No such station found' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

//update status by station id
const updateStatus = async (req, res) => {
    const id = req.params.id;

    const fuelStation = await FuelStation.findOne({ id: id });

    const password = fuelStation.password;

    const name = fuelStation.name;
    const ownername = fuelStation.ownername;
    const phonenumber = fuelStation.phonenumber;
    const address = fuelStation.address;
    const arrivaltime = fuelStation.arrivaltime;
    const finishtime = fuelStation.finishtime;
    const stock = fuelStation.stock;
    const queue = fuelStation.queue;

    const changeStatus = {
        id: id,
        name: name,
        ownername: ownername,
        phonenumber: phonenumber,
        address: address,
        arrivaltime: arrivaltime,
        finishtime: finishtime,
        status: req.params.status,
        stock: stock,
        queue: queue,
        password: password

    }

    try {
        const response = await FuelStation.findOneAndUpdate({ id: id }, changeStatus);
        if (response) {
            return res.status(200).send({ message: 'Successfully updated' })
        } else {

            return res.status(500).send({ message: 'Internal server error' });
        }

    } catch (err) {
        return res.status(400).send({ message: 'Unable to update' })
    }

}

//update stock details
const updatestock = async (req, res) => {
    const id = req.params.id;

    const fuelStation = await FuelStation.findOne({ id: id });
    const password = fuelStation.password;

    const name = fuelStation.name;
    const ownername = fuelStation.ownername;
    const phonenumber = fuelStation.phonenumber;
    const address = fuelStation.address;
    const arrivaltime = fuelStation.arrivaltime;
    const finishtime = fuelStation.finishtime;
    const status = fuelStation.status;
    const queue = fuelStation.queue;

    const changeStatus = {
        id: id,
        name: name,
        ownername: ownername,
        phonenumber: phonenumber,
        address: address,
        arrivaltime: arrivaltime,
        finishtime: finishtime,
        status: status,
        stock: {
            diesel: req.body.diesel,
            petrol: req.body.petrol
        },
        queue: queue,
        password: password

    }

    try {
        const response = await FuelStation.findOneAndUpdate({ id: id }, changeStatus);
        if (response) {
            return res.status(200).send({ message: 'Successfully updated' })
        } else {

            return res.status(500).send({ message: 'Internal server error' });
        }

    } catch (err) {
        return res.status(400).send({ message: 'Unable to update' })
    }

}

//update queue length
const updatelength = async (req, res) => {
    const id = req.params.id;

    const fuelStation = await FuelStation.findOne({ id: id });

    const password = fuelStation.password;

    const name = fuelStation.name;
    const ownername = fuelStation.ownername;
    const phonenumber = fuelStation.phonenumber;
    const address = fuelStation.address;
    const arrivaltime = fuelStation.arrivaltime;
    const finishtime = fuelStation.finishtime;
    const status = fuelStation.status;
    const stock = fuelStation.stock;

    const changeStatus = {
        id: id,
        name: name,
        ownername: ownername,
        phonenumber: phonenumber,
        address: address,
        arrivaltime: arrivaltime,
        finishtime: finishtime,
        status: status,
        stock: stock,
        queue: {
            Car: req.body.queue.car,
            Van: req.body.queue.van,
            Bus: req.body.queue.bus,
            Bike: req.body.queue.bike,
            Tuk: req.body.queue.tuk
        },
        password: password

    }

    try {
        const response = await FuelStation.findOneAndUpdate({ id: id }, changeStatus);
        if (response) {
            return res.status(200).send({ message: 'Successfully updated' })
        } else {

            return res.status(500).send({ message: 'Internal server error' });
        }

    } catch (err) {
        return res.status(400).send({ message: 'Unable to update' })
    }

}

//update stock time time 
const updateStockTime = async (req, res) => {
    const id = req.params.id;

    const fuelStation = await FuelStation.findOne({ id: id });

    const password = fuelStation.password;

    const name = fuelStation.name;
    const ownername = fuelStation.ownername;
    const phonenumber = fuelStation.phonenumber;
    const address = fuelStation.address;
    const status = fuelStation.status;
    const stock = fuelStation.stock;
    const queue = fuelStation.queue;

    const changeStatus = {
        id: id,
        name: name,
        ownername: ownername,
        phonenumber: phonenumber,
        address: address,
        arrivaltime: req.body.arrivaltime,
        finishtime: req.body.finishtime,
        status: status,
        stock: stock,
        queue: queue,
        password: password

    }

    try {
        const response = await FuelStation.findOneAndUpdate({ id: id }, changeStatus);
        if (response) {
            return res.status(200).send({ message: 'Successfully updated' })
        } else {

            return res.status(500).send({ message: 'Internal server error' });
        }

    } catch (err) {
        return res.status(400).send({ message: 'Unable to update' })
    }

}


//update station details
const updateDetails = async (req, res) => {
    const id = req.params.id;

    const fuelStation = await FuelStation.findOne({ id: id });

    const password = fuelStation.password;

    const name = fuelStation.name;
    const ownername = fuelStation.ownername;
    const phonenumber = fuelStation.phonenumber;
    const address = fuelStation.address;
    const arrivaltime = fuelStation.arrivaltime;
    const finishtime = fuelStation.finishtime;
    const queue = fuelStation.queue;

    const changeStatus = {
        id: id,
        name: name,
        ownername: ownername,
        phonenumber: phonenumber,
        address: address,
        arrivaltime: arrivaltime,
        finishtime: finishtime,
        status: req.body.status,
        stock: req.body.stock,
        queue: queue,
        password: password

    }

    try {
        const response = await FuelStation.findOneAndUpdate({ id: id }, changeStatus);
        if (response) {
            return res.status(200).send({ message: 'Successfully updated' })
        } else {

            return res.status(500).send({ message: 'Internal server error' });
        }

    } catch (err) {
        return res.status(400).send({ message: 'Unable to update' })
    }

}

//get vehicle count
const getcount = async (req, res) => {
    let value = req.params.id.trim();
    console.log("carcount");
    try {

        let fuealStationData = await FuelStation.findOne({ id: value });

        if (fuealStationData) {

            let carCount = fuealStationData.queue.Car;
            let vanCount = fuealStationData.queue.Van;
            let busCount = fuealStationData.queue.Bus;
            let bikeCount = fuealStationData.queue.Bike;
            let tukCount = fuealStationData.queue.Tuk;


            let allCount = carCount + vanCount + busCount + bikeCount + tukCount;

            return res.status(200).send({ count: allCount });

        } else {
            return res.status(404).send({ message: 'No such vehicle type found' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

//get Car count
const getCarCount = async (req, res) => {
    let value = req.params.id.trim();

    try {

        let fuealStationData = await FuelStation.findOne({ id: value });

        if (fuealStationData) {

            let carCount = fuealStationData.queue.Car;

            return res.status(200).send({ count: carCount });

        } else {
            return res.status(404).send({ message: 'No such vehicle type found' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

//get Van count
const getVanCount = async (req, res) => {
    let value = req.params.id.trim();

    try {

        let fuealStationData = await FuelStation.findOne({ id: value });

        if (fuealStationData) {

            let vanCount = fuealStationData.queue.Van;

            return res.status(200).send({ count: vanCount });

        } else {
            return res.status(404).send({ message: 'No such vehicle type found' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

//get bus count
const getBusCount = async (req, res) => {
    let value = req.params.id.trim();

    try {

        let fuealStationData = await FuelStation.findOne({ id: value });

        if (fuealStationData) {

            let busCount = fuealStationData.queue.Bus;

            return res.status(200).send({ count: busCount });

        } else {
            return res.status(404).send({ message: 'No such vehicle type found' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

//get bike count
const getBikeCount = async (req, res) => {
    let value = req.params.id.trim();

    try {

        let fuealStationData = await FuelStation.findOne({ id: value });

        if (fuealStationData) {

            let bikeCount = fuealStationData.queue.Bike;

            return res.status(200).send({ count: bikeCount });

        } else {
            return res.status(404).send({ message: 'No such vehicle type found' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

//get tuke count
const getTukCount = async (req, res) => {
    let value = req.params.id.trim();

    try {

        let fuealStationData = await FuelStation.findOne({ id: value });

        if (fuealStationData) {

            let tukCount = fuealStationData.queue.Tuk;

            return res.status(200).send({ count: tukCount });

        } else {
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
    getTukCount,
    login,
    updateStockTime,

}