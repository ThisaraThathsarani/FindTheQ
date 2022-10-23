const mongoose = require("mongoose");
const { Schema } = mongoose;

const QueueSchema = new Schema( {


    stationname: {
        type: String,
    },

    arrivaltime: {
        type: String,
    },

    leavetime: {
        type: String,
    },

    status: {
        type: String,
    },
    
    vehicleType: {
        type: String,
        required: true,
    },
    

});


const Queue = mongoose.model("queue", QueueSchema);

module.exports = Queue;