const express = require('express');
const router = express.Router();
const { Genre , validate }=require("../models/genre");
const Joi = require('joi');
const { User } = require('../models/user');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMiddleware = require('../middleware/async')
// /api/genres

router.get("/",asyncMiddleware(async (req , res , next) => {
        const genres = await Genre.find().sort('name');   
        res.send(genres);
}));

router.get("/:id",asyncMiddleware (async (req , res)=>{
   // const genre = genres.find( (c) =>  c.id === parseInt(req.params.id));
   const genre = await Genre.findById(req.params.id);
   
   if(!genre) return res.status(404).send("The Course With given id was not found ");
    
    res.send(genre);
}));

router.post("/",auth,asyncMiddleware( async (req ,res) => {
const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
}));

router.put("/:id",asyncMiddleware( async (req , res) => {
    const result = Joi.validate(req.body);

    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }

    const genre = await Genre.findByIdAndUpdate(req.params.id , { name : req.body.name},{ new : true , useFindAndModify: false});

    if(!genre) return res.status(404).send("The Course With given id was not found ");

    res.send(genre);
}));


router.delete("/:id",[auth,admin],asyncMiddleware( async (req, res) => {

    const genre = await Genre.findByIdAndRemove(req.params.id);

   if(!genre) return res.status(404).send("The Course With given id was not found ");
    res.send(genre);
}));

module.exports = router;