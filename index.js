const Joi = require('joi');

Joi.objectId = require('joi-objectid')(Joi);
const config = require('config');   
const mongoose = require('mongoose');
const express = require('express');
const genres = require('./routes/genres');
const home = require("./routes/home");
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const app = express();

if(!config.get("jwtPrivateKey")){
    console.error("FATAL ERROR : jwtPrivateKey is not defined");
    process.exit(1);
}


mongoose.connect("mongodb://localhost/vidley",{ useNewUrlParser: true ,useUnifiedTopology: true})
            .then(() => console.log("Connected To MongoDb"))
            .catch((err) => console.log(err));
             
app.use(express.json());
app.use("/",home);
app.use("/api/genres",genres);
app.use("/api/customers",customers);
app.use("/api/movies",movies);
app.use("/api/rentals",rentals);
app.use("/api/users",users);
app.use("/api/auth",auth);



app.listen(3000,() => console.log("Listening on Port 3000 ......"));