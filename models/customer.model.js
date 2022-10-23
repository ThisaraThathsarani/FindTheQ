const mongoose = require("mongoose");
const { Schema } = mongoose;

const CustomerSchema = new Schema( {

    customername: {
        type: String,
        required: true,
    },

    vehicleid : {
        type: String,
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


    password: {
        type: String,
        required: true,
    }

});


const Customer = mongoose.model("customer", CustomerSchema);

module.exports = Customer;