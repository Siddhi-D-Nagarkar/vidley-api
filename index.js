const mongoose = require('mongoose');
const express = require('express');
const genres = require('./routes/genres');
const home = require("./routes/home");
const app = express();

mongoose.connect("mongodb://localhost/movies",{ useNewUrlParser: true ,useUnifiedTopology: true})
            .then(() => console.log("Connected To MongoDb"))
            .catch((err) => console.log(err));
             
app.use(express.json());
app.use("/",home);
app.use("/api/genres",genres);



app.listen(3000,() => console.log("Listening on Port 3000 ......"));