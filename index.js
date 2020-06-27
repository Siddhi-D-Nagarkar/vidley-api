const mongoose = require('mongoose');
const express = require('express');
const genres = require('./routes/genres');
const home = require("./routes/home");
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require("./routes/rentals");
const app = express();

mongoose.connect("mongodb://localhost/vidley",{ useNewUrlParser: true ,useUnifiedTopology: true})
            .then(() => console.log("Connected To MongoDb"))
            .catch((err) => console.log(err));
             
app.use(express.json());
app.use("/",home);
app.use("/api/genres",genres);
app.use("/api/customers",customers);
app.use("/api/movies",movies);
app.use("/api/rentals",rentals);



app.listen(3000,() => console.log("Listening on Port 3000 ......"));