const winston = require('winston');
require('winston-mongodb')

module.exports =function(){
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
        new (winston.transports.Console)({colorize : true, prettyPrint : true}),
        new (winston.transports.File)({ filename: 'logfile.log' }),
        ]
    });
    winston.add(new winston.transports.MongoDB({db :'mongodb://localhost/vidley'}));

}