const mongoose = require("mongoose");
const { Schema } = mongoose;
 
const FuelStationSchema = new Schema( { 

    id: {
        type: String,
    },

    name: {
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
        Car: {type: String }, Van: {type: String }, Bus: {type: String }, Bike: {type: String }, Tuk: {type: String }
    }


})


const FuelStation = mongoose.model("fuelstation", FuelStationSchema);

module.exports = FuelStation;