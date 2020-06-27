const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name : {
        type : String,
        minlength : 5,
        maxlength :50,
        required : true,
    }
});

const Genre = mongoose.model("Genere", genreSchema);

function validate(body){
    const schema = {
        name : Joi.string().min(5).max(50).required(),
    };
  
    return Joi.validate(body,schema);
}

exports.Genre = Genre;
exports.validate =validate;
exports.genreSchema = genreSchema;