const express = require('express');
const { User, validate } = require('../models/user');
const router = express.Router();
const lodash = require('lodash');
const bcrypt = require('bcrypt');


//api/users
router.post("/", async (req , res)=>{

    const result = validate(req.body);
    if(result.error)  return res.status(400).send(result.error.details[0].message);
     
    let user =await User.findOne({ email: req.body.email});
    if(user) return res.status(400).send("User Already Registered ");

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    
    try{
        user = await user.save();
        const token = user.generateAuthToken();
        res.header('x-auth-token',token).send(lodash.pick(user,["name","email"]));
    }catch(err){
        console.log(err);
    }
    
});

module.exports = router;