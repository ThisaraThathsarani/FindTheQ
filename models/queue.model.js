const mongoose = require("mongoose");
const { Schema } = mongoose;

const QueueSchema = new Schema( {

    queueid: {
        type: String,
        required: true,
    },

    queuelength: {
        type: String,
        required: true,
    },

    vehicleType: {
        type: String,
        required: true,
    }

});


const Queue = mongoose.model("queue", QueueSchema);

module.exports = Queue;