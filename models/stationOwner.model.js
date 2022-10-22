const mongoose = require("mongoose");
const { Schema } = mongoose;

const StationSchema = new Schema( {

    stationid: {
        type: String,
        required: true,
    },

    ownername: {
        type: String,
        required: true,
    },
    
    phonenumber: {
        type: String,
    },

    stationname: {
        type: String,
        required: true,
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

    fueltype: {
        
    },

    password: {
        
    }


});


const Station = mongoose.model("station", StationSchema);

module.exports = Station;