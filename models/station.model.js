const mongoose = require("mongoose");
const { Schema } = mongoose;
 
const FuelStationSchema = new Schema( { 

    stationid: {
        type: String,
    },

    stationname: {
        type: String,
    },

    ownername: {
        type:String,
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
        diesel: {type: String }, petrol: {type: String }
    },

    queue: {
        Car: {type: String }, Van: {type: String }, Bus: {type: String }, Bike: {type: String }
    }


})


const FuelStation = mongoose.model("fuelstation", FuelStationSchema);

module.exports = FuelStation;