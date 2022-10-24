const mongoose = require("mongoose");
const { Schema } = mongoose;

const CustomerSchema = new Schema( {

    customerName: {
        type: String,
        required: true,
    },

    vehicleId : {
        type: String,
    },

    nic: {
        type: String,
    },

    phoneNumber: {
        type: String,
    },

    vehicleType: {
        type: String,
    },


    password: {
        type: String,
        required: true,
    }

});


const Customer = mongoose.model("customer", CustomerSchema);

module.exports = Customer;