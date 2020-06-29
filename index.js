const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging.js')();
require('./startup/config')();
require('./startup/db.js')();
require("./startup/routes")(app);

require("./startup/validation.js")();

//throw new Error("Uncaught exception")
// const p = Promise.reject(new Error("Uncaught Promise"))
// .then(() => log.error(err.message));

app.listen(3000,() => winston.info("Listening on Port 3000 ......"));