const express = require('express');
const { User } = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
//api/users
router.post("/", async (req , res)=>{
    console.log("Hi");
    
    let result = validate(req.body);
    if(result.error)  return res.status(400).send(result.error.details[0].message);
     console.log("After result");
     
    let user =await User.findOne({ email: req.body.email});
    console.log(user);
    
    if(!user) return res.status(400).send("Invalid email address or password ");
    console.log("After user");

    const validatePassword = await bcrypt.compare(req.body.password, user.password);
    if(!validatePassword) return res.status(400).send("Invalid email address or password ");
    console.log("after password");
    
    const token = user.generateAuthToken();
    res.send(token);

});

function validate(req){
    const schema = {
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(255).required(),
    }

    return Joi.validate(req,schema);
}

module.exports = router; 