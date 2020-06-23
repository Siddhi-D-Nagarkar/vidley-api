const express = require('express');
const router = express.Router();
const Joi = require('joi');

var genres =[
    { id : 1 , value : "Action"},
    { id : 2 , value : "Adventure"},
    { id : 3 , value : "Comedy"},
    { id : 4 , value : "Drama"},
    { id : 5 , value : "Horro"},
    { id : 6 , value : "Romance"},
]

router.get("/",(req , res) => {
    res.send(genres);
});

router.get("/:id",(req , res)=>{
   // const genre = genres.find( (c) =>  c.id === parseInt(req.params.id));
   const genre = genres.find( c => c.id === parseInt(req.params.id));
   if(!genre) return res.status(404).send("The Course With given id was not found ");
    
    res.send(genre);
});

router.post("/",(req ,res) => {
    const schema = {
        value : Joi.string().min(3).required()
    }

    const result = Joi.validate(req.body , schema);

    if(result.error){
        return res.status(400).send(result.error.details[0].message);
        
    }

    const genre = {
        id : genres.length+1,
        value : req.body.value,
    }
    genres.push(genre);
    res.send(genre);

});

router.put("/:id",(req , res) => {
    const genre = genres.find( c => c.id === parseInt(req.params.id));
   if(!genre) return res.status(404).send("The Course With given id was not found ");

    const schema = {
        value : Joi.string().min(3).required()
    }

    const result = Joi.validate(req.body , schema);

    if(result.error){
        return res.status(400).send(result.error.details[0].message);
        
    }

    genre.value=req.body.value;
    res.send(genre);
});


router.delete("/:id",(req, res) => {
    const genre = genres.find( c => c.id === parseInt(req.params.id));
   if(!genre) return res.status(404).send("The Course With given id was not found ");

    const index = genres.indexOf(genre);
    genres.splice(index,1);

    res.send(genre);
});

module.exports = router;