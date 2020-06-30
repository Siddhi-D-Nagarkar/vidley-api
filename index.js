const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging.js')();
require('./startup/config')(); 
require('./startup/db.js')();
require("./startup/routes")(app);
require("./startup/validation.js")();


const port = process.env.PORT || 3000 ;
const server = app.listen(port, () => winston.info("Listening on Port 3000 ......"));

module.exports = server;