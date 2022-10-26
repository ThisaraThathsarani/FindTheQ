const mongoose = require("mongoose");
const { Schema } = mongoose;

const CustomerSchema = new Schema( {

    customername: {
        type: String,
        required: true,
    },

    email: {
        type:String,
        unique: true
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
    },

    isJoined : {
        type: Boolean,

    }

});


const Customer = mongoose.model("customer", CustomerSchema);

module.exports = Customer;