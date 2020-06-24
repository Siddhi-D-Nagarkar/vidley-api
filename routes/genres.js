const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');

const Genre = mongoose.model("Genere",new mongoose.Schema({
    name : {
        type : String,
        minlength : 5,
        maxlength :50,
        required : true,
    }
}));
// /api/genres



router.get("/",async (req , res) => {
    const genres = await Genre.find().sort('name');   
    res.send(genres);
});

router.get("/:id", async (req , res)=>{
   // const genre = genres.find( (c) =>  c.id === parseInt(req.params.id));
   const genre = await Genre.findById(req.params.id);
   
   if(!genre) return res.status(404).send("The Course With given id was not found ");
    
    res.send(genre);
});

router.post("/",async (req ,res) => {
    const schema = {
        name : Joi.string().min(3).required()
    }

    const result = Joi.validate(req.body , schema);
    // console.log(result.value);
    
    if(result.error){
        return res.status(400).send(result.error.details[0].message);
     }
    // console.log("hi bro");
    
    let genre = new Genre({ name : req.body.name });
    try{
        genre = await genre.save();
        console.log(genre);
    }catch(err){
        console.log(err);
    }
    res.send(genre);

});

router.put("/:id",async (req , res) => {
    const schema = {
        name : Joi.string().min(3).required()
    }

    const result = Joi.validate(req.body , schema);

    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }

    const genre = await Genre.findByIdAndUpdate(req.params.id , { name : req.body.name},{ new : true , useFindAndModify: false});

    if(!genre) return res.status(404).send("The Course With given id was not found ");

    res.send(genre);
});


router.delete("/:id",async (req, res) => {

    const genre = await Genre.findByIdAndRemove(req.params.id);

   if(!genre) return res.status(404).send("The Course With given id was not found ");
    res.send(genre);
});

module.exports = router;