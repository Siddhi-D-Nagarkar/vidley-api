const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
module.exports =function(){
    const db = config.get("db")
    mongoose.connect(db,{ useNewUrlParser: true ,useUnifiedTopology: true})
            .then(() => winston.info(`Connected To ${db}`))
        
}