const express = require('express');
const router = express.Router();
const { Customer , validate} = require("../models/customer");
const mongoose = require('mongoose');



//     ----/api/customers
router.get("/",async (req , res) => {
    const customers = await Customer.find().sort({name : 1});
    res.send(customers);
});


router.get("/:id",async (req , res) => {
    
    try{
        const customer = await Customer.findById(req.params.id);
        if(!customer) return res.status(404).send("The Course With given id was not found ");
        res.send(customer);
    }catch(err){
        console.log(err.errors);
    }
  });


router.post("/",async (req , res) => {
    
    const result = validate(req.body);
    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }

    const customer1 = new Customer({
        isGold :   req.body.isGold,
        name :     req.body.name,
        phone :    req.body.phone,
    });
    try{
        const customer = await customer1.save();
        res.send(customer);
    }catch(err){
        console.log(err.errors);
    }

});

router.put("/:id",async (req , res) => {
    const result = validate(req.body);
    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }

    const customer = await Customer.findByIdAndUpdate(req.params.id , { name : req.body.name},{ new : true , useFindAndModify: false});
    if(!customer) return res.status(404).send("The Course With given id was not found ");

    res.send(customer);
});

router.delete("/:id",async (req, res) => {

    const customer = await Customer.findByIdAndRemove(req.params.id);

   if(!customer) return res.status(404).send("The Course With given id was not found ");
    res.send(customer);
});


module.exports = router;