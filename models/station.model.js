const mongoose = require("mongoose");
const { Schema } = mongoose;

const FuelStationSchema = new Schema({

    id: {
        type: String,
        unique: true
    },

    name: {
        type: String,
    },

    ownername: {
        type: String,
    },

    phonenumber: {
        type: String,
    },

    address: {
        type: String,
    },

    arrivaltime: {
        type: String,
    },

    finishtime: {
        type: String,
    },

    status: {
        type: String,
    },

    stock: {
        diesel: { type: String }, petrol: { type: String }
    },

    queue: {
        Car: { type: Number }, Van: { type: Number }, Bus: { type: Number }, Bike: { type: Number }, Tuk: { type: Number }
    },

    password: {
        type: String
    }


})


const FuelStation = mongoose.model("fuelstation", FuelStationSchema);

module.exports = FuelStation;