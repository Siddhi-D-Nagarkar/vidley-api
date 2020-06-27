const mongoose = require('mongoose');
const { genreSchema } = require('./genre');
const Joi = require('joi');

const Movie = mongoose.model("Movie",new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true,
        minlength : 5,
        maxlength :255,
    },
    genre : {
        type: genreSchema,
        required : true,
    },
    numberInStock: {
        type: Number,
        required : true,
        min: 0,
        max: 255,
    },
    dailyRentalRate : {
        type : Number,
        required : true,
        min: 0,
        max: 255,
    },

}));

function validateMovie(movie){
    const schema = {
        title: Joi.string().min(5).max(255).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required(),
    }

    return Joi.validate(movie,schema);
}

exports.validate = validateMovie;
exports.Movie = Movie;