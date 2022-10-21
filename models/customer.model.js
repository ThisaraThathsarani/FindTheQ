const mongoose = require("mongoose");
const { Schema } = mongoose;

const CustomerSchema = new Schema( {

    customername: {
        type: String,
        required: true,
    },

    nic: {
        type: String,
    },

    phonenumber: {
        type: String,
    },

    vehicletype: {
        type: String,
    },

    arrivaltime: {
        type: String,
    },

    departtime: {
        type: String,
    },

    password: {
        type: String,
        required: true,
    },

    fueltype: {
        type: String,
    }

});


const Customer = mongoose.model("customer", CustomerSchema);

module.exports = Customer;