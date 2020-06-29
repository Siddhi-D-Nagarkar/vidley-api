const Joi = require('joi');
const winston = require('winston');
require('winston-mongodb')
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
const error = require('./middleware/error');
const app = express();

//To Handle errors without the context of express example line no 32
process.on('uncaughtException',(err) => {
    console.log(" We caught an uncaught exception");
    winston.error(err.message,err);
});

process.on('unhandledRejection',(err) => {
    console.log(" We caught an uncaught rejection");
    winston.error(err.message,err);
});


winston.configure({
    transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'logfile.log' }),
    ]
  });
  winston.add(new winston.transports.MongoDB({db :'mongodb://localhost/vidley'}));

//throw new Error("Uncaught exception")
const p = Promise.reject(new Error("Uncaught Promise"))
.then(() => log.error(err.message));



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

app.use(error);

app.listen(3000,() => console.log("Listening on Port 3000 ......"));