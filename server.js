const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();


const PORT = process.env.PORT || 4000;
const URL = process.env.URL;

app.use(express.urlencoded({ extended: false }))
app.use(cors());
app.use(express.json());

mongoose.connect(URL, {
   
    useNewUrlParser: true,
    useUnifiedTopology: true,
 
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb Connection success!");
})

app.listen(PORT, () => {
    console.log(`Server Is Running on Port: ${PORT}`);
});

//customer route
let customer = require('./routes/customer.route')
app.use('/api/customers', customer);


//station route
let station = require('./routes/stationOwner.route')
app.use('/api/stations', station);

//queue route
let queue = require('./routes/queue.route')
app.use('/api/queues', queue);


//new station route
let fuelStation = require('./routes/station.route')
app.use('/api/fuelstation', fuelStation);

