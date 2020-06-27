const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model("Customers", new mongoose.Schema({
    isGold : Boolean,
    name : {
        type : String,
        min : 5,
        maxlength : 25,
        required : true,
    },
    phone : {
        type : String,
        minlength : 5,
        maxlength :50,
    },
}));


function validate(body){
    const schema = {
        isGold : Joi.boolean(),
        name : Joi.string().min(5).max(50).required(),
        phone : Joi.string().min(10).max(50).required(),
    };
  
    return Joi.validate(body,schema);
}

exports.Customer = Customer;
exports.validate =validate;